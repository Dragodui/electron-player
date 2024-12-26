import { FC, useEffect, useState } from 'react'
import { useAudio } from '../hooks/useAudio'
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react'
import { ISongData } from '../../../types'
import { AudioSlider } from './UI/AudioSlider'
import { VolumeSlider } from './UI/VolumeSlider'

interface MusicPlayerProps {
  song: ISongData | null
  onPrevious: () => void
  onNext: () => void
}

const MusicPlayer: FC<MusicPlayerProps> = ({ song, onPrevious, onNext }): JSX.Element => {
  const { isPlaying, duration, currentTime, volume, togglePlay, handleVolumeChange, handleSeek } =
    useAudio(song ? song.src : '')
    const [isMuted, setIsMuted] = useState(false)
    const [prevVolume, setPrevVolume] = useState(0.4)
  useEffect(() => {
    if (song) {
      console.log("Playing song:", song.src)
      handleVolumeChange(0.4)
    }
  }, [song])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleToggleMute = () => {
    if (isMuted) {
      handleVolumeChange(prevVolume)
      setIsMuted(false)
    } else {
      setPrevVolume(volume)
      handleVolumeChange(0)
      setIsMuted(true)
    }
  }


  if (!song) {
    return <p></p>
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={onPrevious}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-2"
            >
              <SkipForward size={24} />
            </button>
            <div className="ml-4">
              <div className="font-semibold text-white">{song.metaData.common.title || "Unknown Title"}</div>
              <div className="text-sm text-gray-400">{song.metaData.common.artist || "Unknown Artist"}</div>
            </div>
          </div>
          <VolumeSlider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(values) => handleVolumeChange(values[0])}
              onToggleMute={handleToggleMute}
              isMuted={isMuted}
            />

        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm tabular-nums text-muted-foreground w-12">
              {formatTime(currentTime)}
            </span>
            <AudioSlider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={(values) => handleSeek(values[0])}
              aria-label="Playback position"
            />
            <span className="text-sm tabular-nums text-muted-foreground w-12">
              {formatTime(duration)}
            </span>
          </div>
      </div>
    </div>
  )
}

export default MusicPlayer