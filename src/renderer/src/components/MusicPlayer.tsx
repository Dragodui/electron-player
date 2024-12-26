import { FC, useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'
import { Play, Pause, Volume2 } from 'lucide-react'
import { ISongData } from '../../../types'

interface MusicPlayerProps {
  song: ISongData | null
}

const MusicPlayer: FC<MusicPlayerProps> = ({ song }): JSX.Element => {
  const { isPlaying, duration, currentTime, volume, togglePlay, handleVolumeChange, handleSeek } =
    useAudio(song ? song.src : '')

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

  if (!song) {
    return <p></p>
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <div className="ml-4">
              <div className="font-semibold">{song.metaData.common.title || "Unknown Title"}</div>
              <div className="text-sm text-gray-500">{song.metaData.common.artist || "Unknown Artist"}</div>
            </div>
          </div>
          <div className="text-sm font-medium">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        {/* <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(values) => handleSeek(values[0])}
          className="mb-4"
        />
        <div className="flex items-center">
          <Volume2 size={20} className="mr-2 text-gray-500" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={(values) => handleVolumeChange(values[0])}
            className="w-32"
          />
        </div> */}
      </div>
    </div>
  )
}

export default MusicPlayer

