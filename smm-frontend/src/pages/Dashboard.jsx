import { useState, useEffect, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { FaInstagram, FaGithub, FaSpotify, FaSteam, FaStepBackward, FaPlay, FaStepForward } from 'react-icons/fa'
import { ThemeContext } from '../App'
import { getUsername } from '../utils/auth'
import SetupGuide, { SETUP_KEY } from '../components/SetupGuide'

const activity = [
  { icon: FaInstagram, color: '#E1306C', text: 'Novi follower: @marko.designs', time: '2 min ago' },
  { icon: FaGithub, text: 'Push na repo: smm-backend', time: '1h ago' },
  { icon: FaInstagram, color: '#E1306C', text: 'Like na post: "New project"', time: '3h ago' },
  { icon: FaGithub, text: 'Nova zvezda na repo: "New project"', time: '5h ago' },
]

function Dashboard() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const username = getUsername()

  const [showSetup, setShowSetup] = useState(() => !localStorage.getItem(SETUP_KEY))
  const [igProfile, setIgProfile] = useState(null)
  const [igMedia, setIgMedia] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/instagram/profile')
      .then(r => r.json())
      .then(data => setIgProfile(data))

    fetch('http://localhost:8080/api/instagram/media')
      .then(r => r.json())
      .then(data => setIgMedia(data.data || []))
  }, [])

  const t = {
    bg: isDark ? '#0F0F1A' : '#E8E8E8',
    card: isDark ? '#1A1A2E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#A0A0B0' : '#555555',
    iconColor: isDark ? '#FFFFFF' : '#000000',
    playerBg: isDark ? '#1A1A2E' : '#FFFFFF',
    progressBg: isDark ? '#21213C' : '#CCCCCC',
  }

  const today = new Date().toLocaleDateString('sr-Latn-RS', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  const accounts = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      info: igProfile ? `${igProfile.media_count} posts` : 'Učitavanje...',
      connected: !!igProfile
    },
    { name: 'GitHub', icon: FaGithub, info: '47 repos', connected: true },
    { name: 'Spotify', icon: FaSpotify, info: 'Connected', connected: true },
    { name: 'Steam', icon: FaSteam, info: 'Disconnected', connected: false },
  ]

  const stats = [
    { label: 'Povezanih mreža', value: igProfile ? 1 : 0 },
    { label: 'Ukupno postova', value: igProfile?.media_count || 0 },
    { label: 'Aktivni nalozi', value: igProfile ? 1 : 0 },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, overflow: 'hidden', position: 'relative' }}>
      {showSetup && <SetupGuide onComplete={() => setShowSetup(false)} />}
      <Sidebar />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 60px', width: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '36px' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <h1 style={{ color: t.text, fontSize: '32px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>
            Dobrodošli nazad, {username} 👋
          </h1>
          <p style={{ color: t.text, fontSize: '24px', fontWeight: '500', fontFamily: 'Inter', margin: 0, textTransform: 'capitalize' }}>
            {today}
          </p>
        </div>

        {/* Account cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
            {accounts.map(({ name, icon: Icon, info, connected }) => (
              <div key={name} style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px', background: t.card, borderRadius: '12px', height: '74px', boxSizing: 'border-box',
                border: isDark ? 'none' : '1px solid #DDDDDD'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={34} color={t.iconColor} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: t.text, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{name}</span>
                    <span style={{ color: t.textSecondary, fontSize: '14px', fontFamily: 'Inter' }}>{info}</span>
                  </div>
                </div>
                <span style={{ color: connected ? '#4CAF50' : '#898989', fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            {stats.map(({ label, value }) => (
              <div key={label} style={{
                flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '40px 20px', background: t.card, borderRadius: '12px', height: '93px', boxSizing: 'border-box',
                border: isDark ? 'none' : '1px solid #DDDDDD'
              }}>
                <span style={{ color: t.text, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{label}</span>
                <span style={{ color: t.textSecondary, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <h2 style={{ color: t.text, fontSize: '24px', fontWeight: '500', fontFamily: 'Inter', margin: 0 }}>
            Recent activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {activity.map(({ icon: Icon, color, text, time }, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px', background: t.card, borderRadius: '12px', height: '56px', boxSizing: 'border-box',
                border: isDark ? 'none' : '1px solid #DDDDDD'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={34} color={color || t.iconColor} />
                  <span style={{ color: t.text, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{text}</span>
                </div>
                <span style={{ color: t.text, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard