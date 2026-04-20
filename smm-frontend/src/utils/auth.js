export function getTokenData() {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const payload = token.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      return decoded
    } catch {
      return null
    }
  }
  
  export function getUsername() {
    const data = getTokenData()
    return data?.sub || 'Korisnik'
  }
  
  export function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }