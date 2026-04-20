import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { FaInstagram, FaSpotify, FaGithub } from 'react-icons/fa'
import { ThemeContext } from '../App'
import { getUsername } from '../utils/auth'

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '58px', height: '27px',
        background: checked ? '#4CAF50' : '#0F0F1A',
        border: '1px solid #6C63FF',
        borderRadius: '53px',
        display: 'flex', alignItems: 'center',
        padding: '4px', cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'background 0.355s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div style={{
        width: '19px', height: '19px',
        borderRadius: '50%',
        background: checked ? '#6C63FF' : '#A0A0B0',
        marginLeft: checked ? 'calc(100% - 19px)' : '0px',
        transition: 'all 0.355s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />
    </div>
  )
}

function Profile() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const navigate = useNavigate()
  const username = getUsername()

  const [igProfile, setIgProfile] = useState(null)
  const [daysSinceJoined, setDaysSinceJoined] = useState(0)

  useEffect(() => {
    fetch('http://localhost:8080/api/instagram/profile')
      .then(r => r.json())
      .then(data => setIgProfile(data))
      .catch(err => console.error(err))

    // Dana aktivan — računamo od kad je token kreiran
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const issued = payload.iat * 1000
        const days = Math.floor((Date.now() - issued) / (1000 * 60 * 60 * 24))
        setDaysSinceJoined(days + 1)
      } catch { setDaysSinceJoined(1) }
    }
  }, [])

  const initials = username ? username.slice(0, 2).toUpperCase() : 'UK'

  const t = {
    bg: isDark ? '#0F0F1A' : '#E8E8E8',
    card: isDark ? '#1A1A2E' : '#FFFFFF',
    innerCard: isDark ? '#21213C' : '#EEEEEE',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: '#A0A0B0',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  const networks = [
    { key: 'instagram', label: 'Instagram', Icon: FaInstagram, connected: !!igProfile },
    { key: 'spotify', label: 'Spotify', Icon: FaSpotify, connected: false },
    { key: 'github', label: 'GitHub', Icon: FaGithub, connected: false },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 60px', width: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '36px' }}>

        <h1 style={{ color: t.text, fontSize: '32px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>Profile</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>

          {/* Identity card */}
          <div style={{ background: t.card, borderRadius: '18px', padding: '21px 30px 16px', border: t.border }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

              {/* Left: avatar + name */}
              <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                {/* Avatar */}
                <div style={{
                  width: '188px', height: '188px',
                  borderRadius: '50%',
                  background: '#6C63FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0, position: 'relative'
                }}>
                  <span style={{ color: '#fff', fontSize: '48px', fontFamily: 'Inter', fontWeight: '700' }}>
                    {initials}
                  </span>
                  <div style={{
                    position: 'absolute', bottom: '0', left: '0', right: '0',
                    background: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(3px)',
                    padding: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    cursor: 'pointer'
                  }}
                    onClick={() => navigate('/settings')}
                  >
                    <span style={{ color: '#FFFFFF', fontSize: '12px', fontFamily: 'Inter' }}>Edit profile</span>
                  </div>
                </div>

                {/* Name info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}>
                  <span style={{ color: t.text, fontSize: '24px', fontFamily: 'Inter', fontWeight: '400' }}>
                    {username}
                  </span>
                  {igProfile && (
                    <span style={{ color: '#A0A0B0', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                      @{igProfile.username}
                    </span>
                  )}
                  <span style={{ color: '#A0A0B0', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                    {igProfile?.account_type || 'Personal'}
                  </span>
                </div>
              </div>

              {/* Right: Edit Profile button */}
              <button
                className="btn-primary"
                onClick={() => navigate('/settings')}
                style={{
                  padding: '16px',
                  background: 'transparent',
                  border: '1px solid #6C63FF',
                  borderRadius: '37px',
                  color: '#6C63FF',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Edit Profile ✏️
              </button>
            </div>
          </div>

          {/* Networks + Stats */}
          <div style={{ background: t.card, borderRadius: '18px', padding: '20px 30px', display: 'flex', gap: '76px', border: t.border }}>

            {/* Povezane mreže */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '400' }}>Povezane Mreže</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {networks.map(({ key, label, Icon, connected }) => (
                  <div key={key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px', background: t.innerCard, borderRadius: '8px', height: '58px', boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={34} color={t.text} />
                      <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>{label}</span>
                    </div>
                    <Toggle checked={connected} onChange={() => {}} />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '10px', flex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>

                <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>Ukupno postova:</span>
                <div style={{ padding: '12px', background: t.innerCard, borderRadius: '8px', minWidth: '51px', textAlign: 'center' }}>
                  <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>
                    {igProfile?.media_count ?? '—'}
                  </span>
                </div>

                <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>Dana aktivan:</span>
                <div style={{ padding: '12px', background: t.innerCard, borderRadius: '8px', minWidth: '45px', textAlign: 'center' }}>
                  <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>
                    {daysSinceJoined}
                  </span>
                </div>

                <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>Tip naloga:</span>
                <div style={{ padding: '12px', background: t.innerCard, borderRadius: '8px', minWidth: '80px', textAlign: 'center' }}>
                  <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>
                    {igProfile?.account_type || '—'}
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile