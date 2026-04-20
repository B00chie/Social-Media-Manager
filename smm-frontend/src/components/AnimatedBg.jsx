function AnimatedBg({ children }) {
  return (
    <div style={{ position: 'relative', width: '50%', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src="/bg-video.webm" type="video/webm" />
      </video>
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '48px'
      }}>
        {children}
      </div>
    </div>
  )
}

export default AnimatedBg