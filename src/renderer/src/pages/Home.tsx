import { ChangeEvent, FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@renderer/store/store';
import { setCurrentSong } from '@renderer/store/slices/currentSongSlice';
import PageLayout from '@renderer/components/PageLayout';
import TrackLayout from '@renderer/components/UI/TrackLayout';
import TrackLayoutSkeleton from '@renderer/components/UI/TrackLayoutSkeleton';
import SearchField from '@renderer/components/UI/SearchField';
import { ISongData } from '../../../types.d';

interface HomeProps {
  songs: ISongData[];
  loading: boolean;
  currentCategory: string;
}

const Home: FC<HomeProps> = ({ songs, loading, currentCategory }): JSX.Element => {
  const currentSong = useSelector((state: RootState) => state.currentSong.currentSong);
  const dispatch = useDispatch();
  const api = (window as any).api;
  const [songsToDisplay, setSongsToDisplay] = useState<ISongData[]>(songs);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setSongsToDisplay(songs);
  }, [songs]);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'favorites':
        return 'Favorite Songs';
      case 'all':
      default:
        return 'All Songs';
    }
  };

  const handleCurrentSong = async (song: ISongData) => {
    try {
      dispatch(setCurrentSong(song));
      await api.addSongToHistory(song.src, '');
    } catch (error) {
      console.error(error);
    }
  };

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value === '') {
      setSongsToDisplay(songs);
    } else {
      const foundSongs = songs.filter((song) => {
        const title = song.metaData.common.title?.toLowerCase() || '';
        const artist = song.metaData.common.artist?.toLowerCase() || '';
        return title.includes(value) || artist.includes(value);
      });
      setSongsToDisplay(foundSongs);
    }
  };

  return (
    <PageLayout>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="text-4xl font-bold">{getCategoryTitle(currentCategory)}</h1>
        <SearchField search={search} />
      </header>
      <div className="flex flex-col gap-4 items-center justify-center">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <TrackLayoutSkeleton key={index} />)
        ) : songsToDisplay.length > 0 ? (
          songsToDisplay.map((song, index) => (
            <TrackLayout
              onClick={() => handleCurrentSong(song)}
              song={song}
              key={index}
              addStyles={
                currentSong !== null && song.src === currentSong.src
                  ? 'bg-[rgba(76,179,207,0.6)]'
                  : ''
              }
            />
          ))
        ) : (
          <p className="mt-[100px] text-center text-gray-400">
            {searchValue !== ''
              ? 'No songs found'
              : currentCategory === 'favorites'
                ? 'No favorite songs yet. Add some to your favorites!'
                : 'Music folder is empty. Please add some songs.'}
          </p>
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
