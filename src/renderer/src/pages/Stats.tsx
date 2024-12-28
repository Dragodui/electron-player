import PageLayout from '@renderer/components/PageLayout';
import TrackLayoutSkeleton from '@renderer/components/UI/TrackLayoutSkeleton';
import { FC, useEffect, useState } from 'react';
import { emotionSong } from 'src/types';
import MoodStats from '@renderer/components/MoodStats';
import HistoryCategory from '@renderer/components/HistoryCategory';

const Stats: FC = (): JSX.Element => {
  const [history, setHistory] = useState<emotionSong[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('history');
  const api = (window as any).api;

  const getHistory = async () => {
    try {
      setLoading(true);
      const songs: emotionSong[] = await api.getSongsFromHistory();
      setHistory(songs);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <PageLayout>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="text-4xl font-bold">Statistics</h1>
      </header>
      <div>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <TrackLayoutSkeleton key={index} />)
        ) : (
          <>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setCurrentCategory('history')}
                className={`px-5 py-2 fond-medium rounded-lg font-medium text-xl ${currentCategory === 'history' ? 'bg-[#4cb3cf]' : 'bg-[#111111]'}`}
              >
                History
              </button>
              <button
                onClick={() => setCurrentCategory('stats')}
                className={`px-5 py-2 fond-medium rounded-lg font-medium text-xl ${currentCategory === 'stats' ? 'bg-[#4cb3cf]' : 'bg-[#111111]'}`}
              >
                Emotions
              </button>
            </div>
            {currentCategory === 'history' ? (
              <HistoryCategory history={history} />
            ) : (
              <MoodStats history={history} />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Stats;
