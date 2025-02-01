import { FC } from 'react';
import HistoryLayout from './UI/HistoryLayout';
import { emotionSong } from 'src/types';

interface HistoryCategoryProps {
  history: emotionSong[];
}

const HistoryCategory: FC<HistoryCategoryProps> = ({ history }): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      {history.map((song) => (
        <HistoryLayout key={song.song.src} song={song} />
      ))}
    </div>
  );
};

export default HistoryCategory;
