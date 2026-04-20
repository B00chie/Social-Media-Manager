import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaGithub, FaSpotify, FaSteam } from 'react-icons/fa'
import AnimatedBg from '../components/AnimatedBg'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleLogin = async () => {
    const newErrors = {}
    if (!username) newErrors.username = 'Ovo polje je prazno'
    if (!password) newErrors.password = 'Ovo polje je prazno'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } else {
      setErrors({ password: 'Pogrešno korisničko ime ili lozinka' })
    }
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '18px 20px',
    marginBottom: errors[field] ? '4px' : '16px',
    background: '#1A1A2E',
    border: errors[field] ? '1px solid #FF5252' : '1px solid rgba(107,107,107,0.4)',
    borderRadius: '8px', color: '#A0A0B0', fontSize: '16px',
    fontFamily: 'Inter', boxSizing: 'border-box', outline: 'none'
  })

  const ErrorBubble = ({ field }) => errors[field] ? (
    <div style={{ background: '#FF5252', color: '#fff', fontSize: '12px', padding: '6px 10px', borderRadius: '6px', marginBottom: '12px', display: 'inline-block', position: 'relative' }}>
      {errors[field]}
      <div style={{ position: 'absolute', top: '-6px', left: '12px', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid #FF5252' }} />
    </div>
  ) : null

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0F0F1A' }}>
      <AnimatedBg>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: '700', textAlign: 'center', letterSpacing: '0.02em', fontFamily: 'Druk Wide Trial' }}>Social Media Manager</h1>
        <p style={{ color: '#fff', fontSize: '24px', fontWeight: '500', marginTop: '16px', textAlign: 'center', fontFamily: 'Inter' }}>Jedna mreža za sve</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '48px' }}>
          {[FaInstagram, FaGithub, FaSpotify, FaSteam].map((Icon, i) => (
            <div key={i} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={40} color="white" />
            </div>
          ))}
        </div>
      </AnimatedBg>

      <div style={{ width: '50%', background: '#1A1A2E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 50px' }}>
        <div style={{ maxWidth: '630px' }}>
          <h2 style={{ color: '#fff', fontSize: '48px', fontWeight: '700', textAlign: 'center', fontFamily: 'Inter', marginBottom: '8px' }}>Dobrodošao nazad</h2>
          <p style={{ color: '#A0A0B0', fontSize: '24px', fontWeight: '400', textAlign: 'center', fontFamily: 'Inter', marginBottom: '32px' }}>Uloguj se na svoj nalog</p>

          <label style={{ color: '#fff', fontSize: '16px', fontWeight: '500', display: 'block', marginBottom: '10px', fontFamily: 'Inter' }}>Username</label>
          <input value={username} onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: null })) }} placeholder="Enter Username" style={inputStyle('username')} />
          <ErrorBubble field="username" />

          <div style={{ position: 'relative', width: '100%', marginBottom: errors.password ? '4px' : '16px' }}>
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: null })) }}
    placeholder="Enter Password"
    style={{
      width: '100%',
      padding: '18px 44px 18px 20px',
      background: '#1A1A2E',
      border: errors.password ? '1px solid #FF5252' : '1px solid rgba(107,107,107,0.4)',
      borderRadius: '8px',
      color: '#A0A0B0',
      fontSize: '16px',
      fontFamily: 'Inter',
      boxSizing: 'border-box',
      outline: 'none'
    }}
  />
  <div
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px'
    }}
  >
    {showPassword ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0A0B0" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0A0B0" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )}
  </div>
</div>

          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <span style={{ color: '#A0A0B0', fontSize: '16px', fontWeight: '500', fontFamily: 'Inter', textDecoration: 'underline', cursor: 'pointer' }}>Zaboravio lozinku?</span>
          </div>

          <button className='btn-primary' onClick={handleLogin} style={{ width: '100%', padding: '16px 35px', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '500', fontFamily: 'Inter', cursor: 'pointer', marginBottom: '16px' }}>
            Uloguj se
          </button>

          <p style={{ textAlign: 'center' }}>
            <span onClick={() => navigate('/register')} style={{ color: '#6C63FF', fontSize: '16px', fontWeight: '500', fontFamily: 'Inter', textDecoration: 'underline', cursor: 'pointer' }}>
              Nemaš nalog? Registruj se
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login