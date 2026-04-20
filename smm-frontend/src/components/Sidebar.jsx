import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ThemeContext } from '../App'

import dashboardIcon from '../assets/icons/dashboard-icon.svg'
import feedIcon from '../assets/icons/Feed-icon.svg'
import connectedIcon from '../assets/icons/Connected-icon.svg'
import notificationsIcon from '../assets/icons/Notifications-icon.svg'
import smmLogo from '../assets/icons/SMM-Logo.svg'
import settingsIcon from '../assets/icons/settings-icon.svg'
import downloadIcon from '../assets/icons/download-circle-icon.svg'
import moonIcon from '../assets/icons/moon.svg'
import sunIcon from '../assets/icons/sun.svg'
import { getUsername, logout } from '../utils/auth'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
  { label: 'Feed', path: '/feed', icon: feedIcon },
  { label: 'Connected', path: '/connected', icon: connectedIcon },
  { label: 'Notifications', path: '/notifications', icon: notificationsIcon },
]

function Sidebar() {
  const username = getUsername()
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark')
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true'
  })
  const [showPopup, setShowPopup] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleCollapsed = () => {
    const newVal = !collapsed
    setCollapsed(newVal)
    localStorage.setItem('sidebarCollapsed', newVal)
  }


  const handleAvatarClick = () => {
    if (showPopup) {
      setPopupVisible(false)
      setTimeout(() => setShowPopup(false), 200)
    } else {
      setShowPopup(true)
      setTimeout(() => setPopupVisible(true), 10)
    }
  }

  const sidebarTheme = {
    sidebar: isDark ? '#1A1A2E' : '#F5F5F5',
    card: isDark ? '#1A1A2E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#8989A8' : '#555555',
    activeBackground: isDark ? 'rgba(108,99,255,0.15)' : 'rgba(108,99,255,0.1)',
    iconFilter: isDark ? 'brightness(0) invert(1)' : 'brightness(0) invert(0)',
    iconFilterSecondary: isDark ? 'brightness(0) invert(0.55)' : 'brightness(0) invert(0.4)',
    exportBg: isDark ? '#21213C' : '#E0E0E0',
    divider: isDark ? '#A0A0B0' : '#CCCCCC',
    border: isDark ? '#FFFFFF' : '#000000',
    popupBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  }

  const W = collapsed ? '72px' : '240px'

  return (
    <div style={{
      width: W,
      minHeight: '100vh',
      background: sidebarTheme.sidebar,
      display: 'flex',
      flexDirection: 'column',
      padding: collapsed ? '20px 8px' : '20px 16px',
      boxSizing: 'border-box',
      flexShrink: 0,
      transition: 'width 0.3s ease, padding 0.3s ease',
      overflow: 'visible',
      justifyContent: 'space-between',
      position: 'relative'
    }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Logo */}
        <div
          onClick={toggleCollapsed}
          style={{
            width: '100%', padding: '8px 4px', marginBottom: '8px',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <img
  src={smmLogo}
  alt="SMM"
  style={{
    height: '36px',
    width: 'auto',
    filter: sidebarTheme.iconFilter,
    transition: 'height 0.3s ease'
  }}
/>
        </div>

        {/* Nav items */}
        {navItems.map(({ label, path, icon }) => {
          const active = location.pathname === path
          return (
            <div key={path} onClick={() => navigate(path)} style={{
              display: 'flex', flexDirection: 'row', alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '10px',
              padding: '14px 16px',
              width: '100%', height: '52px',
              background: active ? sidebarTheme.activeBackground : 'transparent',
              borderRadius: '6px', cursor: 'pointer', boxSizing: 'border-box',
            }}>
              <img src={icon} alt={label} style={{
                width: '24px', height: '24px', flexShrink: 0,
                filter: active ? sidebarTheme.iconFilter : sidebarTheme.iconFilterSecondary,
              }} />
              {!collapsed && (
                <span style={{
                  color: active ? sidebarTheme.text : sidebarTheme.textSecondary,
                  fontSize: '16px', fontFamily: 'Inter', fontWeight: '400', whiteSpace: 'nowrap'
                }}>{label}</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', position: 'relative' }}>

        {/* Export your stats */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: collapsed ? 'center' : 'space-between',
          alignItems: 'center', padding: collapsed ? '10px' : '10px 12px',
          width: '100%', height: '40px', background: sidebarTheme.exportBg,
          borderRadius: '8px', boxSizing: 'border-box', cursor: 'pointer'
        }}>
          {!collapsed && (
            <span style={{ color: sidebarTheme.text, fontSize: '12px', fontFamily: 'Inter', fontWeight: '500' }}>Export your stats</span>
          )}
          <img src={downloadIcon} alt="download" style={{ width: '18px', height: '18px', filter: sidebarTheme.iconFilter, flexShrink: 0 }} />
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: sidebarTheme.divider }} />

        {/* Theme + Settings */}
        <div style={{ display: 'flex', flexDirection: collapsed ? 'column' : 'row', alignItems: 'center', gap: '8px', width: '100%' }}>
          <div onClick={toggleTheme} style={{
            width: '36px', height: '36px', border: `1px solid ${sidebarTheme.border}`,
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0
          }}>
            <img src={isDark ? sunIcon : moonIcon} alt="theme toggle" style={{ width: '20px', height: '20px', filter: sidebarTheme.iconFilter }} />
          </div>
          <div onClick={() => navigate('/settings')} style={{
            width: '36px', height: '36px', border: `1px solid ${sidebarTheme.border}`,
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0
          }}>
            <img src={settingsIcon} alt="settings" style={{ width: '18px', height: '18px', filter: sidebarTheme.iconFilter }} />
          </div>
        </div>

        {/* User profile */}
        <div
          onClick={handleAvatarClick}
          style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '8px', width: '100%', height: '48px',
            borderRadius: '6px', boxSizing: 'border-box', cursor: 'pointer'
          }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', background: '#6C63FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden'
          }}>
            <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'Inter', fontWeight: '600' }}>
              {username ? username.slice(0, 2).toUpperCase() : 'UK'}
            </span>
          </div>
          {!collapsed && (
            <span style={{ color: sidebarTheme.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '400', whiteSpace: 'nowrap' }}>
              {username}
            </span>
          )}
        </div>

        {/* Profile Popup */}
        {showPopup && (
          <div style={{
            position: 'absolute',
            bottom: '56px',
            left: collapsed ? '50%' : '16px',
            transform: collapsed ? 'translateX(-50%)' : 'none',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            minWidth: '200px',
            background: sidebarTheme.card,
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            border: `1px solid ${sidebarTheme.popupBorder}`,
            opacity: popupVisible ? 1 : 0,
            transform: popupVisible
              ? (collapsed ? 'translateX(-50%) translateY(0)' : 'translateY(0)')
              : (collapsed ? 'translateX(-50%) translateY(20px)' : 'translateY(20px)'),
            transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => { setShowPopup(false); navigate('/profile') }}
              style={{
                background: 'transparent', border: 'none',
                borderBottom: `1px solid ${sidebarTheme.popupBorder}`,
                color: sidebarTheme.text, fontSize: '16px', fontFamily: 'Inter',
                fontWeight: '500', padding: '15px 22px', textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Profile
            </button>
            <button
              onClick={logout}
              style={{
                background: '#FB2828', border: 'none', color: '#fff',
                fontSize: '16px', fontFamily: 'Inter', fontWeight: '500',
                padding: '15px 22px', textAlign: 'left', cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              Log out
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Sidebar