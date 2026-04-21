import { useState, useEffect, useContext } from 'react'
import { FaInstagram, FaGithub, FaSpotify, FaSteam, FaCheck, FaArrowRight, FaTimes } from 'react-icons/fa'
import { ThemeContext } from '../App'
import { getUsername } from '../utils/auth'

export const SETUP_KEY = 'smm_setup_complete'

const STEPS = ['welcome', 'platforms', 'done']

export default function SetupGuide({ onComplete }) {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const username = getUsername()

  const [step, setStep] = useState(0)
  const [spotifyConnected, setSpotifyConnected] = useState(false)
  const [igConnected, setIgConnected] = useState(false)
  const [exiting, setExiting] = useState(false)

  const t = {
    card:          isDark ? '#1A1A2E' : '#FFFFFF',
    text:          isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#A0A0B0' : '#666666',
    border:        isDark ? '#2D2D44' : '#E0E0E0',
    rowBg:         isDark ? '#0F0F1A' : '#F5F5F5',
    accent:        '#6C63FF',
  }

  useEffect(() => {
    fetch('http://localhost:8080/api/spotify/status')
      .then(r => r.json()).then(d => setSpotifyConnected(!!d.connected)).catch(() => {})
    fetch('http://localhost:8080/api/instagram/profile')
      .then(r => r.json()).then(d => setIgConnected(!!d.username)).catch(() => {})
  }, [step])

  const finish = () => {
    setExiting(true)
    setTimeout(() => {
      localStorage.setItem(SETUP_KEY, 'true')
      onComplete()
    }, 300)
  }

  const platforms = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      color: '#E1306C',
      connected: igConnected,
      label: igConnected ? 'Povezan' : 'Potreban access token',
      actionLabel: null,
    },
    {
      name: 'Spotify',
      icon: FaSpotify,
      color: '#1DB954',
      connected: spotifyConnected,
      label: spotifyConnected ? 'Povezan' : 'Nije povezan',
      actionLabel: spotifyConnected ? null : 'Poveži',
      onAction: () => { window.location.href = 'http://localhost:8080/api/spotify/login' },
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      color: isDark ? '#FFFFFF' : '#24292e',
      connected: false,
      label: 'Uskoro',
      actionLabel: null,
      soon: true,
    },
    {
      name: 'Steam',
      icon: FaSteam,
      color: '#4C6B8A',
      connected: false,
      label: 'Uskoro',
      actionLabel: null,
      soon: true,
    },
  ]

  const connectedCount = platforms.filter(p => p.connected).length

  // ── Overlay ──────────────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: 'opacity 0.3s ease',
    }}>

      {/* Card */}
      <div style={{
        background: t.card,
        borderRadius: '20px',
        width: '100%', maxWidth: '520px',
        padding: '40px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        position: 'relative',
        border: `1px solid ${t.border}`,
        transform: exiting ? 'scale(0.96)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}>

        {/* Skip button */}
        <button onClick={finish} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: t.textSecondary, padding: '6px', borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = t.text}
          onMouseLeave={e => e.currentTarget.style.color = t.textSecondary}
          title="Preskoči"
        >
          <FaTimes size={16} />
        </button>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              height: '4px',
              borderRadius: '2px',
              flex: i === step ? 2 : 1,
              background: i <= step ? t.accent : t.border,
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>

        {/* ── Step 0: Welcome ── */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '36px', lineHeight: 1 }}>👋</div>
            <h2 style={{ color: t.text, fontSize: '26px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>
              Dobrodošli, {username}!
            </h2>
            <p style={{ color: t.textSecondary, fontSize: '15px', fontFamily: 'Inter', lineHeight: '1.6', margin: 0 }}>
              Social Media Manager vam omogućava da pratite sve vaše platforme
              sa jednog mesta. Za samo par koraka ćemo podesiti vaš nalog.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              {[
                { icon: FaInstagram, color: '#E1306C', text: 'Instagram — feed, pratioce i notifikacije' },
                { icon: FaSpotify,   color: '#1DB954', text: 'Spotify — muzika uz vas gde god da ste' },
                { icon: FaGithub,    color: isDark ? '#FFF' : '#24292e', text: 'GitHub — repozitorijumi (uskoro)' },
                { icon: FaSteam,     color: '#4C6B8A', text: 'Steam — gaming aktivnost (uskoro)' },
              ].map(({ icon: Icon, color, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 14px', borderRadius: '10px',
                  background: t.rowBg,
                }}>
                  <Icon size={20} color={color} />
                  <span style={{ color: t.text, fontSize: '14px', fontFamily: 'Inter' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Platforms ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ color: t.text, fontSize: '22px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>
              Povežite platforme
            </h2>
            <p style={{ color: t.textSecondary, fontSize: '14px', fontFamily: 'Inter', margin: 0 }}>
              Povežite naloge koje koristite — preskočite ono što vam ne treba.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
              {platforms.map(({ name, icon: Icon, color, connected, label, actionLabel, onAction, soon }) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: '12px',
                  background: t.rowBg,
                  border: connected ? `1px solid #4CAF5040` : `1px solid transparent`,
                  opacity: soon ? 0.5 : 1,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: `${color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <div style={{ color: t.text, fontSize: '15px', fontWeight: '600', fontFamily: 'Inter' }}>{name}</div>
                      <div style={{ color: connected ? '#4CAF50' : t.textSecondary, fontSize: '12px', fontFamily: 'Inter' }}>
                        {label}
                      </div>
                    </div>
                  </div>

                  {connected && (
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: '#4CAF5020',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FaCheck size={12} color="#4CAF50" />
                    </div>
                  )}

                  {!connected && actionLabel && (
                    <button onClick={onAction} style={{
                      background: t.accent, border: 'none', cursor: 'pointer',
                      color: '#FFFFFF', fontSize: '13px', fontWeight: '600',
                      fontFamily: 'Inter', padding: '8px 16px', borderRadius: '8px',
                      transition: 'opacity 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      {actionLabel}
                    </button>
                  )}

                  {soon && (
                    <span style={{
                      fontSize: '11px', fontFamily: 'Inter', fontWeight: '600',
                      color: t.textSecondary, background: t.border,
                      padding: '4px 10px', borderRadius: '20px',
                    }}>
                      Uskoro
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p style={{ color: t.textSecondary, fontSize: '12px', fontFamily: 'Inter', margin: 0 }}>
              {connectedCount === 0
                ? 'Nijedna platforma još nije povezana.'
                : `${connectedCount} ${connectedCount === 1 ? 'platforma je' : 'platforme su'} uspešno povezane.`}
            </p>
          </div>
        )}

        {/* ── Step 2: Done ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: '#6C63FF20',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FaCheck size={30} color={t.accent} />
            </div>
            <h2 style={{ color: t.text, fontSize: '24px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>
              Sve je postavljeno!
            </h2>
            <p style={{ color: t.textSecondary, fontSize: '15px', fontFamily: 'Inter', lineHeight: '1.6', margin: 0, maxWidth: '360px' }}>
              Vaš Social Media Manager je spreman. Sve platforme možete u bilo kom
              trenutku da promenite u <strong style={{ color: t.text }}>Settings</strong>.
            </p>

            <div style={{
              display: 'flex', gap: '24px', marginTop: '8px',
              padding: '20px 32px', borderRadius: '14px', background: t.rowBg,
              width: '100%', justifyContent: 'center', boxSizing: 'border-box',
            }}>
              {platforms.map(({ name, icon: Icon, color, connected, soon }) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative' }}>
                    <Icon size={28} color={soon ? t.textSecondary : color} />
                    {connected && (
                      <div style={{
                        position: 'absolute', bottom: '-2px', right: '-4px',
                        width: '12px', height: '12px', borderRadius: '50%',
                        background: '#4CAF50', border: `2px solid ${t.rowBg}`,
                      }} />
                    )}
                  </div>
                  <span style={{ color: t.textSecondary, fontSize: '11px', fontFamily: 'Inter' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Navigation buttons ── */}
        <div style={{
          display: 'flex', justifyContent: step === 0 ? 'flex-end' : 'space-between',
          alignItems: 'center', marginTop: '32px',
        }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              background: 'none', border: `1px solid ${t.border}`,
              color: t.textSecondary, cursor: 'pointer',
              fontSize: '14px', fontFamily: 'Inter', fontWeight: '600',
              padding: '12px 20px', borderRadius: '10px', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSecondary }}
            >
              Nazad
            </button>
          )}

          <button
            onClick={step === STEPS.length - 1 ? finish : () => setStep(s => s + 1)}
            style={{
              background: t.accent, border: 'none', cursor: 'pointer',
              color: '#FFFFFF', fontSize: '14px', fontWeight: '600',
              fontFamily: 'Inter', padding: '12px 24px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {step === STEPS.length - 1 ? 'Počni sa korišćenjem' : 'Nastavi'}
            {step < STEPS.length - 1 && <FaArrowRight size={13} />}
          </button>
        </div>
      </div>
    </div>
  )
}
