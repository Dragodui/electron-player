import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {
  getMusicFiles: async (folderPath: string) => ipcRenderer.invoke('get-music-files', folderPath),
  selectFolder: async () => ipcRenderer.invoke('dialog:selectFolder'),

  //database
  getMusicFromDB: async () => ipcRenderer.invoke('get-music-db'),
  addToFavorite: async (songSrc: string) => ipcRenderer.invoke('add-song-to-favorite', songSrc)
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
