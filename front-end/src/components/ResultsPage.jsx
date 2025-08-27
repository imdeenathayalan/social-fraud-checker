import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, ArrowLeft, Check, X, AlertTriangle } from 'lucide-react'
import ConfidenceChart from './ConfidenceChart'

const ResultsPage = ({ result, onBack }) => {
  if (!result) return null

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter
  }

  const platformColors = {
    instagram: '#E1306C',
    facebook: '#1877F2',
    twitter: '#1DA1F2'
  }

  const statusIcons = {
    genuine: Check,
    fraudulent: X,
    suspicious: AlertTriangle
  }

  const statusClasses = {
    genuine: 'status-genuine',
    fraudulent: 'status-fraudulent',
    suspicious: 'status-suspicious'
  }

  const PlatformIcon = platformIcons[result.platform]
  const StatusIcon = statusIcons[result.status]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onBack}
        className="back-button"
      >
        <ArrowLeft size={18} />
        Back to search
      </button>

      <div className="card">
        <div className="result-header">
          <div className="result-platform">
            <PlatformIcon size={32} color={platformColors[result.platform]} />
            <div className="result-username">@{result.username}</div>
          </div>
          
          <div className={`status-badge ${statusClasses[result.status]}`}>
            <StatusIcon size={18} />
            <span className="capitalize">{result.status}</span>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="section-title">Confidence Score</h3>
          <ConfidenceChart score={result.confidence} />
        </div>

        <div>
          <h3 className="section-title">Reasons</h3>
          <ul className="reasons-list">
            {result.reasons.map((reason, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="reason-item"
              >
                <div style={{ flexShrink: 0, marginTop: '0.25rem' }}>
                  {result.status === 'genuine' ? (
                    <Check size={16} color="var(--success-color)" />
                  ) : result.status === 'fraudulent' ? (
                    <X size={16} color="var(--danger-color)" />
                  ) : (
                    <AlertTriangle size={16} color="var(--warning-color)" />
                  )}
                </div>
                <span>{reason}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default ResultsPage