import { FC, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Emotion, emotionSong } from '../../../../types.d';
import { Laugh, Smile, Meh, Annoyed, Frown, SmilePlus } from 'lucide-react';
import EmotionPickerModal from '../Modals/EmotionPickerModal';

interface HistoryLayoutProps {
  song: emotionSong;
}

const HistoryLayout: FC<HistoryLayoutProps> = ({ song }): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const emotions: Emotion[] = [
    {
      icon: <Frown color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'sad'
    },
    {
      icon: <Annoyed color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'annoyed'
    },
    {
      icon: <Meh color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'neutral'
    },
    {
      icon: <Smile color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'good'
    },
    {
      icon: <Laugh color="rgba(255,255,255,0.6)" width={30} height={30} />,
      name: 'happy'
    }
  ];
  useEffect(() => {
    const picture = song.song.metaData.common.picture;

    if (picture && picture.length > 0) {
      const albumCover = picture[0];
      const base64Image = Buffer.from(albumCover.data).toString('base64');
      const mimeType = albumCover.format || 'image/jpeg';

      const imageSrc = `data:${mimeType};base64,${base64Image}`;
      setImageSrc(imageSrc);
    }
  }, [song]);

  return (
    <>
      <div
        className={`cursor-pointer flex items-center w-full gap-4 text-white p-4 rounded-lg  hover:bg-[rgba(76,179,207,0.1)] transition-all duration-300`}
      >
        <div className="flex-shrink-0 w-11 h-11 sm:w-11 sm:h-11 rounded-md overflow-hidden">
          {imageSrc ? (
            <img src={imageSrc} alt="Album cover" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
              No Cover
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <p className="text-lg font-semibold truncate">
            {song.song.metaData.common.title ? song.song.metaData.common.title : 'Unknown Title'}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {song.song.metaData.common.artist ? song.song.metaData.common.artist : 'Unknown Artist'}
          </p>
        </div>
        <div>
          {(() => {
            const matchingEmotion = emotions.find((emotion) => emotion.name === song.emotion);
            if (matchingEmotion) {
              return matchingEmotion.icon;
            }
            return (
              <button onClick={() => setIsModalVisible(true)}>
                <SmilePlus color="rgba(255,255,255,0.6)" width={30} height={30} />
              </button>
            );
          })()}
        </div>
      </div>
      <EmotionPickerModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        songSrc={song.song.src}
      />
    </>
  );
};

export default HistoryLayout;
