import { createSlice } from '@reduxjs/toolkit';
import { ISongData } from '../../../../types';

export interface currentSongState {
  currentSong: ISongData | null;
}

const initialState: currentSongState = {
  currentSong: null
};

export const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    }
  }
});

export const setCurrentSong = currentSongSlice.actions.setCurrentSong;
