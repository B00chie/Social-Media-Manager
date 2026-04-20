import { useState, useEffect, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { FaInstagram, FaHeart, FaComment, FaBookmark } from 'react-icons/fa'
import { ThemeContext } from '../App'

const filters = ['All', 'Instagram', 'GitHub', 'Spotify', 'Steam']

function Feed() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const t = {
    bg: isDark ? '#0F0F1A' : '#E8E8E8',
    card: isDark ? '#1A1A2E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? 'rgba(255,255,255,0.59)' : 'rgba(0,0,0,0.59)',
    border: isDark ? 'none' : '1px solid #DDDDDD',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mediaRes, profileRes] = await Promise.all([
          fetch('http://localhost:8080/api/instagram/media'),
          fetch('http://localhost:8080/api/instagram/profile')
        ])
        const mediaData = await mediaRes.json()
        const profileData = await profileRes.json()
        setPosts(mediaData.data || [])
        setProfile(profileData)
      } catch (err) {
        console.error('Instagram fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)} days ago`
  }

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'All' || activeFilter === 'Instagram') return true
    return false
  })

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: '24px', width: 0, minWidth: 0 }}>

        {/* Header + Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ color: t.text, fontSize: '32px', fontWeight: '700', fontFamily: 'Inter', margin: 0 }}>Feed</h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="btn-primary" style={{
                padding: '10px 16px',
                background: activeFilter === f ? 'rgba(108,99,255,0.39)' : 'rgba(108,99,255,0.1)',
                border: '1px solid #7D63FF',
                borderRadius: '36px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'Inter',
                cursor: 'pointer'
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <span style={{ color: t.text, fontSize: '18px', fontFamily: 'Inter' }}>Učitavanje...</span>
          </div>
        )}

        {/* Instagram Posts Grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {filteredPosts.map(post => (
              <div key={post.id} style={{
                background: t.card,
                borderRadius: '12px',
                overflow: 'hidden',
                border: t.border,
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FaInstagram size={18} color="#FFFFFF" />
                    </div>
                    <span style={{ color: t.textSecondary, fontSize: '14px', fontFamily: 'Inter' }}>
                      @{profile?.username || 'kouhkey'}
                    </span>
                  </div>
                  <span style={{ color: t.textSecondary, fontSize: '14px', fontFamily: 'Inter' }}>
                    {formatDate(post.timestamp)}
                  </span>
                </div>

                {/* Image */}
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {post.media_type === 'CAROUSEL_ALBUM' && (
                    <div style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: 'rgba(0,0,0,0.6)', borderRadius: '4px',
                      padding: '2px 6px'
                    }}>
                      <span style={{ color: '#fff', fontSize: '12px' }}>📷 Album</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div style={{ padding: '12px 16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaHeart size={18} color="#E1306C" />
                    <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                      {post.like_count}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaComment size={18} color={t.text} />
                    <span style={{ color: t.text, fontSize: '16px', fontFamily: 'Inter', fontWeight: '500' }}>
                      {post.comments_count}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                {post.caption && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <p style={{
                      color: t.text, fontSize: '14px', fontFamily: 'Inter',
                      margin: 0, lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Feed