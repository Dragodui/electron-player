import { createSlice } from '@reduxjs/toolkit';
import { ISongData } from '../../../../types';

export interface SongsState {
  songs: ISongData[];
}

const initialState: SongsState = {
  songs: []
};

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    }
  }
});

export const setSongs = songsSlice.actions.setSongs;
