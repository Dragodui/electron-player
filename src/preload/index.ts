import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {
  selectFolder: async () => ipcRenderer.invoke('dialog:selectFolder'),

  //database
  getMusicFromDB: async () => ipcRenderer.invoke('get-music-db'),
  toggleFavorite: async (songSrc: string) => ipcRenderer.invoke('toggle-favorite-song', songSrc),
  checkIfFavorite: async (songSrc: string) => ipcRenderer.invoke('check-song-in-favorite', songSrc),
  getFavoriteSongs: async () => ipcRenderer.invoke('get-favorite-songs'),
  addSongToHistory: async (songSrc: string, emotion: string) =>
    ipcRenderer.invoke('add-song-to-history', songSrc, emotion),
  getSongsFromHistory: async () => ipcRenderer.invoke('get-history'),
  rateSong: async (songSrc: string, emotion: string) =>
    ipcRenderer.invoke('rate-song', songSrc, emotion)
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
