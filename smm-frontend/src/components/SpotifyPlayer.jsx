import { useState, useContext } from 'react'
import { FaSpotify, FaStepBackward, FaPlay, FaPause, FaStepForward, FaChevronDown } from 'react-icons/fa'
import { ThemeContext } from '../App'

const tracks = [
  { title: 'Whole lotta red', artist: 'Playboi Carti', duration: '1:32' },
  { title: 'Dark Knight Dummo', artist: 'Trippie Redd', duration: '2:45' },
  { title: 'Magnolia', artist: 'Playboi Carti', duration: '3:12' },
  { title: 'New Tank', artist: 'Playboi Carti', duration: '1:58' },
  { title: 'Sky', artist: 'Playboi Carti', duration: '2:21' },
]

function SpotifyPlayer() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const [collapsed, setCollapsed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(28)

  const t = {
    bg: isDark ? '#1A1A2E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#A0A0B0' : '#555555',
    progressBg: isDark ? '#21213C' : '#CCCCCC',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  const track = tracks[currentTrack]

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: collapsed ? '60px' : '340px',
      background: t.bg,
      boxShadow: '0px 0px 20px rgba(0,0,0,0.3)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: t.border,
      transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      zIndex: 999
    }}>

      {collapsed ? (
        <div
          onClick={() => setCollapsed(false)}
          style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <FaSpotify size={28} color="#1DB954" />
        </div>
      ) : (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaSpotify size={20} color="#1DB954" />
              <span style={{ color: '#1DB954', fontSize: '14px', fontFamily: 'Inter', fontWeight: '600' }}>Spotify</span>
            </div>
            <div onClick={() => setCollapsed(true)} style={{ cursor: 'pointer' }}>
              <FaChevronDown size={14} color={t.textSecondary} />
            </div>
          </div>

          {/* Current track info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #1DB954, #0F0F1A)',
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <FaSpotify size={22} color="#FFFFFF" />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ color: t.text, fontSize: '14px', fontFamily: 'Inter', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {track.title}
              </div>
              <div style={{ color: t.textSecondary, fontSize: '12px', fontFamily: 'Inter' }}>
                {track.artist}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              style={{ position: 'relative', width: '100%', height: '9px', cursor: 'pointer' }}
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100)
                setProgress(pct)
              }}
            >
              <div style={{ position: 'absolute', width: '100%', height: '6px', top: '1.5px', background: t.progressBg, borderRadius: '34px' }} />
              <div style={{ position: 'absolute', width: `${progress}%`, height: '6px', top: '1.5px', background: '#1DB954', borderRadius: '34px' }} />
              <div style={{ position: 'absolute', left: `calc(${progress}% - 5px)`, top: '0px', width: '9px', height: '9px', background: '#FFFFFF', borderRadius: '50%', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: t.textSecondary, fontSize: '11px', fontFamily: 'Inter' }}>
                0:{String(Math.floor(progress * 0.92)).padStart(2, '0')}
              </span>
              <span style={{ color: t.textSecondary, fontSize: '11px', fontFamily: 'Inter' }}>
                {track.duration}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <FaStepBackward
              size={16} color={t.text} style={{ cursor: 'pointer' }}
              onClick={() => setCurrentTrack(p => (p - 1 + tracks.length) % tracks.length)}
            />
            <div
              onClick={() => setPlaying(!playing)}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {playing
                ? <FaPause size={14} color="#FFFFFF" />
                : <FaPlay size={14} color="#FFFFFF" style={{ marginLeft: '2px' }} />
              }
            </div>
            <FaStepForward
              size={16} color={t.text} style={{ cursor: 'pointer' }}
              onClick={() => setCurrentTrack(p => (p + 1) % tracks.length)}
            />
          </div>

          {/* Track list */}
          <div className="spotify-tracklist" style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {tracks.map((tr, i) => (
              <div
                key={i}
                onClick={() => { setCurrentTrack(i); setProgress(0) }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '6px 8px', borderRadius: '6px',
                  background: currentTrack === i ? 'rgba(29,185,84,0.15)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <span style={{ color: currentTrack === i ? '#1DB954' : t.textSecondary, fontSize: '11px', fontFamily: 'Inter', minWidth: '14px' }}>
                    {currentTrack === i ? '▶' : i + 1}
                  </span>
                  <span style={{
                    color: currentTrack === i ? '#1DB954' : t.text,
                    fontSize: '12px', fontFamily: 'Inter', fontWeight: currentTrack === i ? '600' : '400',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {tr.title}
                  </span>
                </div>
                <span style={{ color: t.textSecondary, fontSize: '11px', fontFamily: 'Inter', flexShrink: 0 }}>
                  {tr.duration}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

export default SpotifyPlayer