import MusicPlayer from '@renderer/components/MusicPlayer';
import PageLayout from '@renderer/components/PageLayout';
import Button from '@renderer/components/UI/Button';
import TrackLayout from '@renderer/components/UI/TrackLayout';
import { FC, useEffect, useState } from 'react';
import { ISongData } from '../../../types';
import Loader from '@renderer/components/UI/Loader';

// interface HomeProps {
//   songs: ISongData[];
// }

const Home: FC = (): JSX.Element => {
  const [songs, setSongs] = useState<ISongData[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const api = (window as any).api;

  const handleFolderSelect = async () => {
    try {
      setLoading(true);
      const files = await api.getMusicFiles();
      setSongs(files);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1));
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0));
  };

  const loadSongsFromDB = async () => {
    try {
      setLoading(true);
      const songsFromDB: ISongData[] = await api.getMusicFromDB();
      setSongs(songsFromDB);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSongsFromDB();
    setCurrentSongIndex(-1);
  }, []);

  return (
    <PageLayout>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="text-4xl font-bold">All songs</h1>
        <Button onClick={handleFolderSelect}>Update Songs</Button>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center ">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <TrackLayout
                onClick={() => {
                  setCurrentSongIndex(index);
                }}
                song={song}
                key={index}
                addStyles={
                  currentSongIndex !== -1 && song.src === songs[currentSongIndex].src
                    ? 'bg-blue-500'
                    : 'bg-gray-800'
                }
              />
            ))
          ) : (
            <Button addStyles="mt-[100px]" onClick={handleFolderSelect}>
              Select Folder
            </Button>
          )}
        </div>
      )}
      <MusicPlayer
        song={currentSongIndex !== -1 ? songs[currentSongIndex] : null}
        onPrevious={handlePreviousSong}
        onNext={handleNextSong}
      />
    </PageLayout>
  );
};

export default Home;
