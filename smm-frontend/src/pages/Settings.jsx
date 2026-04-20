import { useState, useContext, useRef, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { FaInstagram, FaSpotify, FaGithub } from 'react-icons/fa'
import { ThemeContext } from '../App'

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
        background: checked ? '#FFFFFF' : '#A0A0B0',
        marginLeft: checked ? 'calc(100% - 19px)' : '0px',
        transition: 'all 0.355s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />
    </div>
  )
}

function Checkbox({ checked, onChange, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', height: '28px' }}>
      <span style={{ color: checked ? '#FFFFFF' : '#898989', fontSize: '16px', fontFamily: 'Inter', fontWeight: '500', flex: 1, transition: 'color 0.2s ease' }}>
        {label}
      </span>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '28px', height: '28px',
          background: checked ? '#8989A8' : 'transparent',
          border: '1px solid #6C63FF',
          borderRadius: '3px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
          transition: 'background 0.2s ease'
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  )
}

function DeleteModal({ onClose, buttonRef }) {
  const [pos, setPos] = useState({ bottom: 0, left: 0 })

  useEffect(() => {
    if (buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPos({
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left + rect.width / 2
      })
    }
  }, [])

  return (
    <div
  onClick={e => e.stopPropagation()}
  style={{
    position: 'fixed',
    bottom: pos.bottom,
    left: Math.min(pos.left, window.innerWidth - 580),
    transform: 'translateX(-50%)',
    background: '#21213C',
    borderRadius: '12px',
    padding: '32px 40px',
    width: '560px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    animation: 'expandFromButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transformOrigin: 'center bottom',
    boxShadow: '0px 0px 40px rgba(0,0,0,0.6)'
  }}
>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    <span style={{ color: '#898989', fontSize: '32px', fontFamily: 'Inter', fontWeight: '400', whiteSpace: 'nowrap' }}>
      Danger Zone
    </span>
    <span style={{ color: '#FFFFFF', fontSize: '18px', fontFamily: 'Inter', textAlign: 'center' }}>
      Doing this you will permanently delete the account and all the data on it
    </span>
  </div>
  <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
    <button style={{ flex: 1, padding: '16px', background: '#8B0836', border: 'none', borderRadius: '8px', color: '#FFFFFF', fontSize: '18px', fontFamily: 'Inter', cursor: 'pointer' }}>
      Delete
    </button>
    <button onClick={onClose} style={{ flex: 1, padding: '16px', background: '#510424', border: 'none', borderRadius: '8px', color: '#FF637E', fontSize: '18px', fontFamily: 'Inter', cursor: 'pointer' }}>
      Cancel
    </button>
  </div>
</div>
  )
}

function Settings() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const deleteButtonRef = useRef(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [allNotifications, setAllNotifications] = useState(false)
  const [networkToggles, setNetworkToggles] = useState({ instagram: false, spotify: false, github: false })
  const [checkboxes, setCheckboxes] = useState({ followers: false, likes: false, comments: false, push: false })
  const [username, setUsername] = useState('')
  const [currentEmail] = useState('kouhkey@kvisuals.rs')
  const [newEmail, setNewEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const handleAllToggle = (val) => {
    setAllNotifications(val)
    setNetworkToggles({ instagram: val, spotify: val, github: val })
    setCheckboxes({ followers: val, likes: val, comments: val, push: val })
  }

  const handleNetworkToggle = (key, val) => {
    const updated = { ...networkToggles, [key]: val }
    setNetworkToggles(updated)
    setAllNotifications(Object.values(updated).every(v => v === true))
  }

  const t = {
    bg: isDark ? '#0F0F1A' : '#E8E8E8',
    card: isDark ? '#1A1A2E' : '#FFFFFF',
    innerCard: isDark ? '#0F0F1A' : '#F0F0F0',
    inputBg: isDark ? '#21213C' : '#E8E8E8',
    text: isDark ? '#FFFFFF' : '#000000',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  const inputStyle = {
    width: '100%', padding: '10px',
    background: t.inputBg, border: 'none',
    borderRadius: '9px', color: t.text,
    fontSize: '16px', fontFamily: 'Inter',
    boxSizing: 'border-box', outline: 'none'
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, overflow: 'hidden' }}>
      <Sidebar />

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          buttonRef={deleteButtonRef}
        />
      )}

        <div style={{ flex: 1, overflowY: 'auto', ocerflowX: 'hidden', padding: '20px 60px',width: 0,minWidth: 0, display: 'flex', flexDirection: 'column', gap: '36px' }}>

        <h1 style={{ color: t.text, fontSize: '32px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>Settings</h1>

        {/* Account Settings */}
        <div style={{ background: t.card, borderRadius: '18px', padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '24px', border: t.border }}>
          <span style={{ color: t.text, fontSize: '24px', fontFamily: 'Inter', fontWeight: '500' }}>Account Settings</span>
          <div style={{ background: t.innerCard, borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>Promena username-a</span>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>New username</span>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Write a new username here..." style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>Promena email adrese</span>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>Curent E-mail</span>
              <div style={{ ...inputStyle, display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#A0A0B0' }}>{currentEmail}</span>
              </div>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>New E-mail</span>
              <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Write a new E-mail here..." style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>Promena lozinke</span>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>Old Password</span>
              <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Write the old password here..." style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>New Password</span>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Write the new password here..." style={inputStyle} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>Verify New Password</span>
                  <input type="password" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} placeholder="Write the new password again to verify..." style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div style={{ background: t.card, borderRadius: '18px', padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: '24px', border: t.border }}>
          <span style={{ color: t.text, fontSize: '24px', fontFamily: 'Inter', fontWeight: '500' }}>Notification Settings</span>

          <div style={{ background: t.innerCard, borderRadius: '10px', padding: '20px', display: 'flex', gap: '28px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 16px', width: '202px' }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>Uključi sve notifikacije</span>
              <Toggle checked={allNotifications} onChange={handleAllToggle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 16px', flex: 1 }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>Notifikacije po mreži</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
                  { key: 'spotify', label: 'Spotify', Icon: FaSpotify },
                  { key: 'github', label: 'GitHub', Icon: FaGithub },
                ].map(({ key, label, Icon }) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={31} color={isDark ? '#FFFFFF' : '#000000'} />
                      <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter' }}>{label}</span>
                    </div>
                    <Toggle checked={networkToggles[key]} onChange={val => handleNetworkToggle(key, val)} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 16px', flex: 1 }}>
              <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>Tip notifikacije</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Followers', 'Likes', 'Comments', 'Push'].map(label => (
                  <Checkbox
                    key={label}
                    label={label}
                    checked={checkboxes[label.toLowerCase()]}
                    onChange={v => setCheckboxes(p => ({ ...p, [label.toLowerCase()]: v }))}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '28px', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <button  className='btn-primary' style={{
  padding: '12px 16px', background: '#4CAF50',
  border: '1px solid #FFFFFF', borderRadius: '12px',
  color: '#FFFFFF', fontSize: '18px', fontFamily: 'Inter',
  fontWeight: '700', cursor: 'pointer',
  width: '155px', height: '53px',
  whiteSpace: 'nowrap'
}}>
  Save changes
</button>

<button 
  className='btn-primary'
  ref={deleteButtonRef}
  onClick={() => setShowDeleteModal(true)}
  style={{
    padding: '12px 16px', background: 'transparent',
    border: '1px solid #A70000', borderRadius: '12px',
    color: '#FF2929', fontSize: '18px', fontFamily: 'Inter',
    fontWeight: '700', cursor: 'pointer',
    width: '166px', height: '53px',
    whiteSpace: 'nowrap'
  }}
>
  Delete account
</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings