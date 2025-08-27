import { useState, useEffect } from 'react'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import ResultsPage from './components/ResultsPage'
import HistoryPage from './components/HistoryPage'
import { checkAccount, getHistory } from './services/api'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false)
  const [checkResult, setCheckResult] = useState(null)
  const [history, setHistory] = useLocalStorage('fraudCheckHistory', [])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Apply dark mode class to document element
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [isDarkMode])

  const handleCheckAccount = async (username, platform) => {
    setIsLoading(true)
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
      setHistory([newHistoryItem, ...history.slice(0, 9)])
      
      setCurrentView('results')
    } catch (error) {
      console.error('Error checking account:', error)
      alert(error.message || 'Failed to check account. Please try again.')
    }
    setIsLoading(false)
  }

  const loadHistory = async () => {
    try {
      const historyData = await getHistory()
      setHistory(historyData)
    } catch (error) {
      console.error('Error loading history:', error)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onCheckAccount={handleCheckAccount} isLoading={isLoading} />
      case 'results':
        return <ResultsPage result={checkResult} onBack={() => setCurrentView('landing')} />
      case 'history':
        return <HistoryPage history={history} onBack={() => setCurrentView('landing')} />
      default:
        return <LandingPage onCheckAccount={handleCheckAccount} isLoading={isLoading} />
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
        onShowHistory={() => {
          loadHistory()
          setCurrentView('history')
        }}
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