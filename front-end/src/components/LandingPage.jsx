import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Search } from 'lucide-react'

const LandingPage = ({ onCheckAccount }) => {
  const [username, setUsername] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [isLoading, setIsLoading] = useState(false)

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter
  }

  const PlatformIcon = platformIcons[platform]

  const platformColors = {
    instagram: '#E1306C',
    facebook: '#1877F2',
    twitter: '#1DA1F2'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setIsLoading(true)
    await onCheckAccount(username.trim(), platform)
    setIsLoading(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ maxWidth: '28rem', margin: '0 auto' }}
    >
      <div className="card-title">Check Social Media Account</div>
      <p className="card-subtitle">Verify the authenticity of any social media profile</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="platform" className="form-label">
            Platform
          </label>
          <div className="select-wrapper">
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">X/Twitter</option>
            </select>
            <div className="select-icon">
              <PlatformIcon size={20} color={platformColors[platform]} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter ${platform} username`}
            className="input-field"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading || !username.trim()}
          className="btn"
        >
          {isLoading ? (
            <div className="loading-spinner" style={{ width: '20px', height: '20px' }}></div>
          ) : (
            <>
              <Search size={18} />
              Check Account
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

export default LandingPage