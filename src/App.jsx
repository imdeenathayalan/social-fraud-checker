import { useState, useEffect } from 'react'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import ResultsPage from './components/ResultsPage'
import HistoryPage from './components/HistoryPage'
import { checkAccount } from './services/api'
import { useLocalStorage } from './hooks/useLocalStorage'
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false)
  const [checkResult, setCheckResult] = useState(null)
  const [history, setHistory] = useLocalStorage('fraudCheckHistory', [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [isDarkMode])

  const handleCheckAccount = async (username, platform) => {
    try {
      const result = await checkAccount(username, platform)
      setCheckResult(result)
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        username,
        platform,
        result
      }
      setHistory([newHistoryItem, ...history.slice(0, 9)]) // Keep only last 10 items
      
      setCurrentView('results')
    } catch (error) {
      console.error('Error checking account:', error)
      alert('Failed to check account. Please try again.')
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onCheckAccount={handleCheckAccount} />
      case 'results':
        return <ResultsPage result={checkResult} onBack={() => setCurrentView('landing')} />
      case 'history':
        return <HistoryPage history={history} onBack={() => setCurrentView('landing')} />
      default:
        return <LandingPage onCheckAccount={handleCheckAccount} />
    }
  }

  return (
    <div className="app">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        showHistoryButton={history.length > 0}
      />
      <main className="main-content">
        <div className="container">
          {renderView()}
        </div>
      </main>
    </div>
  )
}

export default App