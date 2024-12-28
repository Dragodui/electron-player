import Home from './pages/Home';
import SidebarPanel from './components/SidebarPanel';
import './index.css';
import MusicPlayer from './components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setCurrentSong } from './store/slices/currentSongSlice';
import { useEffect, useState } from 'react';
import { ISongData } from 'src/types';
import { setSongs } from './store/slices/songsSlice';

function App(): JSX.Element {
  const currentSong = useSelector((state: RootState) => state.currentSong.currentSong);
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const api = (window as any).api;
  const dispatch = useDispatch();

  const handlePreviousSong = () => {
    const currentSongIndex = currentSong
      ? songs.findIndex((song) => song.src === currentSong.src)
      : -1;
    const newIndex: number = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    dispatch(setCurrentSong(songs[newIndex]));
  };

  const handleNextSong = () => {
    const currentSongIndex = currentSong
      ? songs.findIndex((song) => song.src === currentSong.src)
      : -1;
    const newIndex: number = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
    dispatch(setCurrentSong(songs[newIndex]));
  };

  const loadSongs = async (category: string) => {
    try {
      setLoading(true);
      let songsToLoad: ISongData[];
      switch (category) {
        case 'favorites':
          songsToLoad = await api.getFavoriteSongs();
          console.log(songsToLoad.length);
          break;
        case 'all':
        default:
          songsToLoad = await api.getMusicFromDB();
          console.log(songsToLoad.length);
          break;
      }
      dispatch(setSongs(songsToLoad));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    loadSongs(category);
  };

  useEffect(() => {
    loadSongs(currentCategory);
    dispatch(setCurrentSong(null));
  }, []);

  return (
    <>
      <SidebarPanel onCategoryChange={handleCategoryChange} currentCategory={currentCategory} />
      <Home songs={songs} loading={loading} currentCategory={currentCategory} />
      <MusicPlayer song={currentSong} onPrevious={handlePreviousSong} onNext={handleNextSong} />
    </>
  );
}

export default App;
