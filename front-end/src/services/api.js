// Mock API function to simulate checking an account
const checkAccount = async (username, platform) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Generate mock results based on username and platform
  const statusOptions = ['genuine', 'fraudulent', 'suspicious']
  const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]
  
  const reasons = {
    genuine: [
      "Consistent posting pattern",
      "Verified account",
      "High engagement rate",
      "Established for over 2 years"
    ],
    fraudulent: [
      "New account (created less than 3 months ago)",
      "Very few followers",
      "No profile picture",
      "Suspicious username pattern",
      "High follower-to-following ratio"
    ],
    suspicious: [
      "Inconsistent posting history",
      "Recent spike in followers",
      "Mixed engagement patterns",
      "Account details partially hidden"
    ]
  }
  
  // Shuffle reasons and take 3-4
  const selectedReasons = reasons[status]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3 + Math.floor(Math.random() * 2))
  
  return {
    username,
    platform,
    status,
    confidence: Math.floor(Math.random() * 40) + (status === 'genuine' ? 60 : 30),
    reasons: selectedReasons
  }
}

export { checkAccount }