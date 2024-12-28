import { Annoyed, Frown, Laugh, Meh, Smile } from 'lucide-react';
import React, { FC } from 'react';

interface Emotion {
  icon: JSX.Element;
  name: string;
}

interface EmotionPickerModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  songSrc: string;
}

const EmotionPickerModal: FC<EmotionPickerModalProps> = ({ isVisible, setIsVisible, songSrc }) => {
  const api = (window as any).api;
  const [selectedEmotion, setSelectedEmotion] = React.useState<string>('');
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

  const handleEmotionClick = async (emotion: Emotion) => {
    try {
      setSelectedEmotion(emotion.name);
      await api.rateSong(songSrc, emotion.name);
      setIsVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`right-0 left-0 top-0 bottom-0 bg-black bg-opacity-50 fixed flex items-center justify-center ${isVisible ? 'flex' : 'hidden'}`}
    >
      <div className=" bg-[#1f2937] py-4 px-6 rounded-lg">
        <h1 className="text-3xl text-center font-bold mb-5">select your emotion</h1>
        <div className="flex items-center gap-3">
          {emotions.map((emotion) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEmotionClick(emotion);
              }}
            >
              {emotion.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionPickerModal;
