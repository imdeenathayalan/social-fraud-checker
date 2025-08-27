const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection with NEW credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fraud_checker',
  password: '$Arcvortex1923$',
  port: 5432,
});

// Create table if not exists
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS fraud_checks (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        platform VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL,
        confidence INTEGER NOT NULL,
        reasons TEXT[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table created or already exists');
  } catch (err) {
    console.error('❌ Error creating table:', err);
  }
};

createTable();

// Mock LLM analysis function
const analyzeWithMockLLM = async (username, platform) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate realistic mock analysis based on username
  const usernameLength = username.length;
  const hasNumbers = /\d/.test(username);
  const hasSpecialChars = /[._-]/.test(username);
  
  // Determine status based on username characteristics
  let status, confidence;
  
  if (usernameLength < 5 || usernameLength > 20) {
    status = 'suspicious';
    confidence = 65;
  } else if (hasNumbers && hasSpecialChars) {
    status = 'fraudulent';
    confidence = 82;
  } else if (username === 'test' || username === 'admin') {
    status = 'fraudulent';
    confidence = 95;
  } else {
    status = 'genuine';
    confidence = 88;
  }
  
  // Reasons based on analysis
  const reasons = {
    genuine: [
      "Username follows common patterns",
      "Appropriate username length",
      "No suspicious character combinations",
      "Matches platform naming conventions"
    ],
    fraudulent: [
      "Username contains suspicious patterns",
      "Unusual character combinations detected",
      "Matches known fake account patterns",
      "Random number/letter sequences"
    ],
    suspicious: [
      "Username length outside normal range",
      "Some unusual characteristics detected",
      "Mixed patterns found",
      "Further verification recommended"
    ]
  };
  
  return {
    status,
    confidence,
    reasons: reasons[status]
  };
};

// API endpoint to check account
app.post('/api/check', async (req, res) => {
  try {
    const { username, platform } = req.body;
    
    if (!username || !platform) {
      return res.status(400).json({ error: 'Username and platform are required' });
    }
    
    // Analyze with mock LLM
    const analysis = await analyzeWithMockLLM(username, platform);
    
    // Save to database
    const result = await pool.query(
      'INSERT INTO fraud_checks (username, platform, status, confidence, reasons) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, platform, analysis.status, analysis.confidence, analysis.reasons]
    );
    
    console.log('✅ Check saved to database:', result.rows[0].id);
    
    res.json({
      username,
      platform,
      status: analysis.status,
      confidence: analysis.confidence,
      reasons: analysis.reasons
    });
    
  } catch (error) {
    console.error('❌ Error checking account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get history
app.get('/api/history', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fraud_checks ORDER BY created_at DESC LIMIT 10');
    console.log('✅ History fetched:', result.rows.length, 'items');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', database: 'Disconnected', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
});