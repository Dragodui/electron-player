import { configureStore } from '@reduxjs/toolkit';
import { songsSlice, SongsState } from './slices/songsSlice';
import { currentSongSlice, currentSongState } from './slices/currentSongSlice';

export const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
    currentSong: currentSongSlice.reducer
  }
});

export type RootState = {
  songs: SongsState;
  currentSong: currentSongState;
};
