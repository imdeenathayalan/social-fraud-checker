import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, ArrowLeft, Check, X, AlertTriangle, Calendar, Clock } from 'lucide-react'

const HistoryPage = ({ history, onBack }) => {
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

  const statusColors = {
    genuine: 'var(--success-color)',
    fraudulent: 'var(--danger-color)',
    suspicious: 'var(--warning-color)'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString()
  }

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
        <h2 className="card-title">Check History</h2>
        
        {history.length === 0 ? (
          <p className="no-history">No history yet. Check some accounts to see them here.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map((item) => {
              const PlatformIcon = platformIcons[item.platform]
              const StatusIcon = statusIcons[item.result.status]
              
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="history-item"
                >
                  <div className="history-header">
                    <div className="history-platform">
                      <PlatformIcon size={20} color={platformColors[item.platform]} />
                      <span>@{item.username}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <StatusIcon size={16} color={statusColors[item.result.status]} />
                      <span style={{ 
                        color: statusColors[item.result.status],
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {item.result.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="history-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{formatTime(item.timestamp)}</span>
                    </div>
                    <div>
                      <span>Confidence: {item.result.confidence}%</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default HistoryPage