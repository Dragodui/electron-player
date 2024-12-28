import PageLayout from '@renderer/components/PageLayout';
import HistoryLayout from '@renderer/components/UI/HistoryLayout';
import { FC, useEffect, useState } from 'react';
import { ISongData } from 'src/types';

const Stats: FC = (): JSX.Element => {
  const [history, setHistory] = useState<ISongData[]>([]);
  const api = (window as any).api;

    const getHistory = async () => {
        try {
            const songs = await api.getSongsFromHistory();
            setHistory(songs);
          } catch (error) {
            console.error(error);
          }
    }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <PageLayout>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="text-4xl font-bold">Statistics</h1>
      </header>
      <div>
        <div>
            {history.map((song) => (<HistoryLayout key={song.src} song={song}/>))}
        </div>
        <div></div>
      </div>
    </PageLayout>
  );
};

export default Stats;
