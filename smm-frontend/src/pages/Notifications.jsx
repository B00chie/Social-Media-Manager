import { useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { FaInstagram, FaGithub, FaSpotify } from 'react-icons/fa'
import { ThemeContext } from '../App'

const filters = ['All', 'Unread', 'Instagram', 'GitHub', 'Spotify']

const notifications = [
  { icon: FaInstagram, color: '#E1306C', text: '@marko.designs te prati', time: '2 min ago', unread: true },
  { icon: FaInstagram, color: '#E1306C', text: '47 novih lajkova', time: '15 min ago', unread: false },
  { icon: FaGithub, color: null, text: 'PR merged: smm-backend #12', time: '1h ago', unread: true },
  { icon: FaInstagram, color: '#E1306C', text: '@marko.designs lajkovao post', time: '2h ago', unread: true },
  { icon: FaGithub, color: null, text: 'New issue opened #13', time: '5h ago', unread: true },
  { icon: FaInstagram, color: '#E1306C', text: '@someone commented: Odličan rad! 👌🏼', time: '2 days ago', unread: false },
]

function Notifications() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const [activeFilters, setActiveFilters] = useState([])
  const [notifs, setNotifs] = useState(notifications)

  const toggleFilter = (f) => {
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )
  }

  const t = {
    bg: isDark ? '#0F0F1A' : '#E8E8E8',
    text: isDark ? '#FFFFFF' : '#000000',
    cardUnread: isDark ? '#1A1A2E' : '#FFFFFF',
    cardRead: isDark ? 'rgba(26,26,46,0.4)' : 'rgba(200,200,200,0.4)',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  const filtered = notifs.filter(n => {
    if (activeFilters.length === 0) return true
    return activeFilters.some(f => {
      if (f === 'All') return true
      if (f === 'Unread') return n.unread
      if (f === 'Instagram') return n.icon === FaInstagram
      if (f === 'GitHub') return n.icon === FaGithub
      if (f === 'Spotify') return n.icon === FaSpotify
      return false
    })
  })

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 60px', width: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '36px' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: t.text, fontSize: '32px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>Notifications</h1>
            <button
              className='btn-primary'
              onClick={markAllRead}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px',
                background: 'transparent',
                border: '1px solid #6C63FF',
                borderRadius: '37px',
                color: '#6C63FF',
                fontSize: '14px',
                fontFamily: 'Inter',
                cursor: 'pointer'
              }}
            >
              Mark all as read
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Selected pills — levo od dividera */}
            {activeFilters.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {filters.filter(f => activeFilters.includes(f)).map(f => (
                  <button className='btn-primary' key={f} onClick={() => toggleFilter(f)} style={{
                    padding: '10px 14px',
                    background: 'rgba(108,99,255,0.39)',
                    border: '1px solid #7D63FF',
                    borderRadius: '36px',
                    color: '#FFFFFF', fontSize: '14px', fontFamily: 'Inter', cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>{f}</button>
                ))}
              </div>
            )}

            {/* Divider */}
            {activeFilters.length > 0 && (
              <div style={{
                width: '1px', height: '30px',
                background: t.text, opacity: 0.4, flexShrink: 0,
                transition: 'all 0.3s ease'
              }} />
            )}

            {/* Unselected pills — desno od dividera */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {filters.filter(f => !activeFilters.includes(f)).map(f => (
                <button className='btn-primary' key={f} onClick={() => toggleFilter(f)} style={{
                  padding: '10px 14px',
                  background: 'rgba(108,99,255,0.11)',
                  border: '1px solid #7D63FF',
                  borderRadius: '36px',
                  color: '#FFFFFF', fontSize: '14px', fontFamily: 'Inter', cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((n, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px',
              background: n.unread ? t.cardUnread : t.cardRead,
              borderLeft: n.unread ? '3px solid #6C63FF' : '3px solid transparent',
              borderRadius: '12px',
              height: '56px',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flex: 1 }}>
                <n.icon size={34} color={n.color || t.text} />
                <span style={{
                  color: t.text,
                  fontSize: '18px',
                  fontWeight: n.unread ? '500' : '300',
                  fontFamily: 'Inter'
                }}>{n.text}</span>
              </div>
              <span style={{
                color: t.text,
                fontSize: '18px',
                fontWeight: n.unread ? '500' : '300',
                fontFamily: 'Inter',
                textAlign: 'right'
              }}>{n.time}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Notifications