import { FC, useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { Play, Pause, SkipBack, SkipForward, SmilePlus } from 'lucide-react';
import { ISongData } from '../../../types.d';
import { AudioSlider } from './UI/AudioSlider';
import { VolumeSlider } from './UI/VolumeSlider';
import { formatTime } from '@renderer/utils/formatTime';
import { Buffer } from 'buffer';
import EmotionPickerModal from './Modals/EmotionPickerModal';

interface MusicPlayerProps {
  song: ISongData | null;
  onPrevious: () => void;
  onNext: () => void;
}

const MusicPlayer: FC<MusicPlayerProps> = ({ song, onPrevious, onNext }): JSX.Element => {
  const { isPlaying, duration, currentTime, volume, togglePlay, handleVolumeChange, handleSeek } =
    useAudio(song ? song.src : '', onNext);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.4);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (song) {
      handleVolumeChange(0.4);
    }
  }, [song]);

  const handleToggleMute = () => {
    if (isMuted) {
      handleVolumeChange(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      handleVolumeChange(0);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (!song) {
      setImageSrc('');
      return;
    }
    const picture = song.metaData.common.picture;

    if (picture && picture.length > 0) {
      const albumCover = picture[0];
      const base64Image = Buffer.from(albumCover.data).toString('base64');
      const mimeType = albumCover.format || 'image/jpeg';

      const imageSrc = `data:${mimeType};base64,${base64Image}`;
      setImageSrc(imageSrc);
    }
  }, [song]);

  if (!song) {
    return <></>;
  }

  return (
    <>
      <img className="max-w-[200px] fixed bottom-[110px] left-[16px]" src={imageSrc ?? ''} alt="" />
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={onPrevious}
                className="p-2 rounded-full bg-[#83dff1] text-white hover:bg-[#5fa1af] hover:focus:outline-none focus:ring-2 focus:ring-[#5fa1af] focus:ring-opacity-50 mr-2"
              >
                <SkipBack size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-[#83dff1] text-white hover:bg-[#5fa1af] focus:outline-none focus:ring-2 focus:ring-[#5fa1af] focus:ring-opacity-50"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={onNext}
                className="p-2 rounded-full bg-[#83dff1] text-white hover:bg-[#72c2d2] focus:outline-none focus:ring-2 focus:ring-[#5fa1af] focus:ring-opacity-50 ml-2"
              >
                <SkipForward size={24} />
              </button>
              <div className="ml-4">
                <div className="font-semibold text-white">
                  {song.metaData.common.title || 'Unknown Title'}
                </div>
                <div className="text-sm text-gray-400">
                  {song.metaData.common.artist || 'Unknown Artist'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button onClick={() => setIsModalVisible(true)}>
                <SmilePlus color="rgba(255,255,255,0.6)" />
              </button>
              <VolumeSlider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={(values) => handleVolumeChange(values[0])}
                onToggleMute={handleToggleMute}
                isMuted={isMuted}
              />
            </div>
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
      <EmotionPickerModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        songSrc={song.src}
      />
    </>
  );
};

export default MusicPlayer;
