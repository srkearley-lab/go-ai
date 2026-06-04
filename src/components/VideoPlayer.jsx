import { useRef, useState } from 'react'

export function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      } else {
        videoRef.current.play()
        setPlaying(true)
      }
    }
  }

  return (
    <section className="w-full py-12 px-4">
      <div
        className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer"
        style={{ border: '1px solid #7627EF' }}
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          x-webkit-airplay="deny"
          className="w-full"
          style={{ display: 'block', maxHeight: '500px', objectFit: 'cover', WebkitMediaControls: 'none' }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>

        {!playing && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.35)' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); handlePlay(); }}
              className="flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #293BFF 0%, #7627EF 100%)',
                boxShadow: '0 0 40px rgba(118,39,239,0.6)',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Play video"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
