import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { FaInstagram, FaGithub, FaSpotify, FaSteam } from 'react-icons/fa'
import { ThemeContext } from '../App'

const accounts = [
  {
    name: 'Instagram', icon: FaInstagram, username: '@kouhkey',
    info: '2.4k followers', connected: true, color: '#E1306C'
  },
  {
    name: 'GitHub', icon: FaGithub, username: '@B00chey',
    info: '47 repos • 12 Stars', connected: true, color: '#FFFFFF'
  },
  {
    name: 'Spotify', icon: FaSpotify, username: '@Koki',
    info: '234 Songs • 12 playlists', connected: true, color: '#1DB954'
  },
  {
    name: 'Steam', icon: FaSteam, username: '',
    info: '', connected: false, color: '#FFFFFF'
  },
  {
    name: '+ Add Account', icon: null, username: '',
    info: '', connected: null, color: '#FFFFFF'
  },
]

function Connected() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const t = {
    bg: isDark ? '#0F0F1A' : '#E8E8E8',
    card: isDark ? '#1A1A2E' : '#FFFFFF',
    addCard: isDark ? '#0F0F1A' : '#E0E0E0',
    text: isDark ? '#FFFFFF' : '#000000',
    inputBg: isDark ? '#21213C' : '#DDDDDD',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, overflowY: 'auto', ocerflowX: 'hidden', padding: '20px 60px',width: 0,minWidth: 0, display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <h1 style={{ color: t.text, fontSize: '32px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>
          Connected Accounts
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px' }}>
          {accounts.map((acc, i) => {
            const Icon = acc.icon

            // Add Account card
            if (acc.connected === null) {
              return (
                <div key={i} style={{
                  width: '313px', height: '180px',
                  background: t.addCard,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '273px', height: '140px',
                    background: t.inputBg,
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                      + Add Account
                    </span>
                  </div>
                </div>
              )
            }

            // Steam disconnected card
            if (!acc.connected) {
              return (
                <div key={i} style={{
                  width: '313px', height: '180px',
                  background: t.card,
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: t.border
                }}>
                  <div style={{ position: 'absolute', left: '16px', top: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Icon size={34} color={acc.color} />
                    <span style={{ color: t.text, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{acc.name}</span>
                  </div>
                  <div style={{
                    position: 'absolute', left: '20px', top: '95px',
                    width: '273px', height: '65px',
                    background: t.inputBg,
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>+ Add Account</span>
                  </div>
                </div>
              )
            }

            // Connected card
            return (
              <div key={i} style={{
                width: '313px', height: '180px',
                background: t.card,
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                border: t.border
              }}>
                {/* Background icon watermark */}
                <div style={{
                  position: 'absolute', right: '-12px', bottom: '-30px',
                  opacity: 0.08
                }}>
                  <Icon size={170} color="#FFFFFF" />
                </div>

                {/* Top left: icon + name + username */}
                <div style={{ position: 'absolute', left: '16px', top: '20px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <Icon size={33} color={acc.color} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ color: t.text, fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>{acc.name}</span>
                    <span style={{ color: '#A0A0B0', fontSize: '14px', fontFamily: 'Inter' }}>{acc.username}</span>
                  </div>
                </div>

                {/* Top right: info + connected */}
                <div style={{ position: 'absolute', right: '10px', top: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ color: '#A0A0B0', fontSize: '14px', fontFamily: 'Inter', textAlign: 'right' }}>{acc.info}</span>
                  <span style={{ color: '#4CAF50', fontSize: '18px', fontWeight: '500', fontFamily: 'Inter' }}>Connected</span>
                </div>

                {/* Bottom left: disconnect */}
                <div style={{ position: 'absolute', left: '16px', bottom: '20px' }}>
                  <span style={{ color: '#FB2828', fontSize: '18px', fontWeight: '500', fontFamily: 'Inter', cursor: 'pointer' }}>Disconnect</span>
                </div>

                {/* Bottom right: view profile */}
                <div style={{ position: 'absolute', right: '10px', bottom: '20px' }}>
                  <span style={{ color: '#898989', fontSize: '18px', fontWeight: '500', fontFamily: 'Inter', cursor: 'pointer' }}>View Profile →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Connected