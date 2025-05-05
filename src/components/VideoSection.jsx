import React from 'react'

export default function VideoSection({ videoKey }) {
  return (
    <div className="w-10/12 md:w-3/5 mx-auto mt-3">
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          allowFullScreen
          title="Trailer"
        />
      </div>
    </div>
  )
}
