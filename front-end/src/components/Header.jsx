import { Instagram, Facebook, Twitter, Moon, Sun, History } from 'lucide-react'

const Header = ({ isDarkMode, toggleDarkMode, currentView, setCurrentView, showHistoryButton, onShowHistory }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icons">
              <Instagram style={{ color: '#E1306C' }} size={28} />
              <Facebook style={{ color: '#1877F2' }} size={28} />
              <Twitter style={{ color: '#1DA1F2' }} size={28} />
            </div>
            <h1>Social Fraud Checker</h1>
          </div>
          
          <div className="header-actions">
            {showHistoryButton && currentView !== 'history' && (
              <button
                onClick={onShowHistory}
                className="history-btn"
              >
                <History size={18} />
                <span>History</span>
              </button>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header