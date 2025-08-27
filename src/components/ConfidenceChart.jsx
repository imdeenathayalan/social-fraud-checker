import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const ConfidenceChart = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ]

  const COLORS = ['var(--primary-color)', 'var(--border-color)']

  return (
    <div style={{ width: '100%', height: '16rem', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '2.25rem', fontWeight: '700' }}>{score}%</span>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Confidence</p>
      </div>
    </div>
  )
}

export default ConfidenceChart