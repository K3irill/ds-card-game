import React, { useRef, useState } from 'react'

const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState(0)

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  const musicFiles = [
    '/audio/1.mp3',
    '/audio/2.mp3',
    '/audio/3.mp3',
    '/audio/4.mp3',
    '/audio/5.mp3',
    '/audio/6.mp3',
  ]
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicFiles.length)
  }
  const handleTrackEnd = () => {
    nextTrack()
  }
  return {
    currentTrack,
    musicFiles,
    toggleMusic,
    nextTrack,
    handleTrackEnd,
    audioRef,
    isPlaying,
  }
}

export default useAudio
