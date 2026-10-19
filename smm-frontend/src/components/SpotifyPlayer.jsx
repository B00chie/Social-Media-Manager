import { useState, useContext, useEffect, useRef, useCallback } from 'react'
import { FaSpotify, FaStepBackward, FaPlay, FaPause, FaStepForward, FaChevronDown } from 'react-icons/fa'
import { ThemeContext } from '../App'

const tracks = [
  { title: 'Whole lotta red', artist: 'Playboi Carti', duration: '1:32', totalSecs: 92 },
  { title: 'Dark Knight Dummo', artist: 'Trippie Redd', duration: '2:45', totalSecs: 165 },
  { title: 'Magnolia', artist: 'Playboi Carti', duration: '3:12', totalSecs: 192 },
  { title: 'New Tank', artist: 'Playboi Carti', duration: '1:58', totalSecs: 118 },
  { title: 'Sky', artist: 'Playboi Carti', duration: '2:21', totalSecs: 141 },
]

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function SpotifyPlayer() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const [collapsed, setCollapsed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [elapsed, setElapsed] = useState(26)

  const dragging = useRef(false)
  const barRef = useRef(null)
  const intervalRef = useRef(null)

  const track = tracks[currentTrack]
  const progress = Math.min((elapsed / track.totalSecs) * 100, 100)

  const t = {
    bg: isDark ? '#1A1A2E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#A0A0B0' : '#555555',
    progressBg: isDark ? '#21213C' : '#CCCCCC',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  // Auto-advance progress when playing
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          if (e >= track.totalSecs) {
            setCurrentTrack(c => (c + 1) % tracks.length)
            return 0
          }
          return e + 0.5
        })
      }, 500)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, track.totalSecs])

  // Compute progress from mouse position
  const progressFromEvent = useCallback((clientX) => {
    if (!barRef.current) return
    const rect = barRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setElapsed(pct * track.totalSecs)
  }, [track.totalSecs])

  // Global mouse events for drag
  useEffect(() => {
    const onMove = (e) => { if (dragging.current) progressFromEvent(e.clientX) }
    const onUp = () => { dragging.current = false; document.body.style.userSelect = '' }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [progressFromEvent])

  const onBarMouseDown = (e) => {
    e.preventDefault()
    dragging.current = true
    document.body.style.userSelect = 'none'
    progressFromEvent(e.clientX)
  }

  const changeTrack = (dir) => {
    setCurrentTrack(c => (c + dir + tracks.length) % tracks.length)
    setElapsed(0)
  }

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
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: playing ? 'pulse 2s ease-in-out infinite' : 'none'
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

          {/* Progress bar — drag only */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              ref={barRef}
              onMouseDown={onBarMouseDown}
              style={{ position: 'relative', width: '100%', height: '16px', cursor: 'grab', display: 'flex', alignItems: 'center' }}
            >
              {/* Track */}
              <div style={{ position: 'absolute', width: '100%', height: '4px', background: t.progressBg, borderRadius: '34px' }} />
              {/* Fill */}
              <div style={{ position: 'absolute', width: `${progress}%`, height: '4px', background: '#1DB954', borderRadius: '34px', transition: dragging.current ? 'none' : 'width 0.5s linear' }} />
              {/* Thumb */}
              <div style={{
                position: 'absolute',
                left: `calc(${progress}% - 7px)`,
                width: '14px', height: '14px',
                background: '#FFFFFF',
                borderRadius: '50%',
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                transition: dragging.current ? 'none' : 'left 0.5s linear',
                cursor: 'grab'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: t.textSecondary, fontSize: '11px', fontFamily: 'Inter' }}>
                {formatTime(elapsed)}
              </span>
              <span style={{ color: t.textSecondary, fontSize: '11px', fontFamily: 'Inter' }}>
                {track.duration}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <FaStepBackward
              size={16} color={t.text} style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onClick={() => changeTrack(-1)}
            />
            <div
              onClick={() => setPlaying(p => !p)}
              style={{
                width: '36px', height: '36px', borderRadius: '50%', background: '#1DB954',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transform: playing ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s',
                boxShadow: playing ? '0 0 12px rgba(29,185,84,0.5)' : 'none'
              }}
            >
              {playing
                ? <FaPause size={14} color="#FFFFFF" />
                : <FaPlay size={14} color="#FFFFFF" style={{ marginLeft: '2px' }} />
              }
            </div>
            <FaStepForward
              size={16} color={t.text} style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onClick={() => changeTrack(1)}
            />
          </div>

          {/* Track list */}
          <div className="spotify-tracklist" style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {tracks.map((tr, i) => (
              <div
                key={i}
                onClick={() => { setCurrentTrack(i); setElapsed(0) }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '6px 8px', borderRadius: '6px',
                  background: currentTrack === i ? 'rgba(29,185,84,0.15)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <span style={{ color: currentTrack === i ? '#1DB954' : t.textSecondary, fontSize: '11px', fontFamily: 'Inter', minWidth: '14px' }}>
                    {currentTrack === i && playing ? '▶' : i + 1}
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(0.93); }
        }
      `}</style>
    </div>
  )
}

export default SpotifyPlayer
