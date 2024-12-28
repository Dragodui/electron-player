import { ISongData } from '../types';
import fs from 'fs/promises';
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import path from 'path';
import * as mm from '../../node_modules/music-metadata/lib/index';
import { initializeDB } from './db';

let mainWindow: BrowserWindow | null = null;
const db = initializeDB();

interface SongRow {
  src: string;
}

const getSongsFromDB = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    db?.all('SELECT src FROM allSongs', [], (error, rows: SongRow[]) => {
      if (error) {
        console.error('Error getting songs from database: ', error);
        reject(error);
      } else {
        const paths: string[] = rows.map((row) => row.src);
        resolve(paths);
      }
    });
  });
};

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      preload: join(__dirname, '../preload/index.js')
      // sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle('dialog:selectFolder', async () => {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory']
    });

    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('get-music-db', async (event): Promise<ISongData[]> => {
    const musicExtensions: string[] = ['.mp3', '.wav', '.flac', '.m4a', '.ogg'];
    try {
      //songs form database
      const paths = await getSongsFromDB();

      //songs from music folder
      const projectRoot = path.resolve(__dirname, '../music');
      const files = await fs.readdir(projectRoot);
      const musicFiles = files.filter((file) =>
        musicExtensions.includes(path.extname(file).toLowerCase())
      );
      const songs: ISongData[] = [];

      if (paths.length !== musicFiles.length) {
        //remove all from database
        db?.serialize(() => {
          db.run(`DELETE FROM allSongs`, (error) => {
            if (error) {
              console.error('Error deleting data from allSongs:', error);
            }
          });
        });

        const musicFilesPath = musicFiles.map((file) => path.join(projectRoot, file));
        for (let file of musicFilesPath) {
          const metaData: mm.IAudioMetadata = await mm.parseFile(file);
          const src = `/music/${path.basename(file)}`;
          const sqlSrc = path.join(projectRoot, path.basename(file));

          db?.serialize(() => {
            db.run(`INSERT INTO allSongs (src) VALUES (?)`, [sqlSrc], (error) => {
              if (error) {
                console.error('Error inserting data into the database:', error);
              }
            });
          });
          const songData: ISongData = { metaData, src };
          songs.push(songData);
        }
      } else {
        for (const file of paths) {
          const metaData: mm.IAudioMetadata = await mm.parseFile(file);
          const src = `/music/${path.basename(file)}`;
          const songData: ISongData = { metaData, src };
          songs.push(songData);
        }
      }
      return songs;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  ipcMain.handle('toggle-favorite-song', async (event, songSrc: string): Promise<void> => {
    const getIsInFavorite = (): Promise<boolean> => {
      const projectRoot: string = path.resolve(__dirname, '../music');
      const databaseSrc: string = path.join(projectRoot, path.basename(songSrc));
      return new Promise((resolve, reject) => {
        db?.get('SELECT 1 FROM favoriteSongs WHERE src = ?', [databaseSrc], (error, row) => {
          if (error) {
            console.error('Error checking song in favorites:', error);
            reject(error);
          } else {
            resolve(!!row);
          }
        });
      });
    };

    try {
      const projectRoot: string = path.resolve(__dirname, '../music');
      const databaseSrc: string = path.join(projectRoot, path.basename(songSrc));
      const isInFavorite = await getIsInFavorite();

      db?.serialize(() => {
        if (isInFavorite) {
          db.run('DELETE FROM favoriteSongs WHERE src = ?', [databaseSrc], (error) => {
            if (error) {
              console.error('Error while removing song from favorites:', error);
            }
          });
        } else {
          db.run('INSERT INTO favoriteSongs (src) VALUES (?)', [databaseSrc], (error) => {
            if (error) {
              console.error('Error while adding song to favorites:', error);
            }
          });
        }
      });
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  });

  ipcMain.handle('check-song-in-favorite', async (event, songSrc: string): Promise<boolean> => {
    try {
      const projectRoot: string = path.resolve(__dirname, '../music');
      const databaseSrc: string = path.join(projectRoot, path.basename(songSrc));
      return new Promise((resolve, reject) => {
        db?.get('SELECT * FROM favoriteSongs WHERE src = ?', [databaseSrc], (error, row) => {
          if (error) {
            console.error('Error while checking song in favorite:', error);
            reject(error);
          } else {
            resolve(row ? true : false);
          }
        });
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  ipcMain.handle('get-favorite-songs', async (event): Promise<ISongData[]> => {
    try {
      interface SongRow {
        src: string;
      }

      const getSongsFromDB = (): Promise<string[]> => {
        return new Promise((resolve, reject) => {
          db?.all('SELECT src FROM favoriteSongs', [], (error, rows: SongRow[]) => {
            if (error) {
              console.error('Error getting songs from database: ', error);
              reject(error);
            } else {
              const paths: string[] = rows.map((row) => row.src);
              resolve(paths);
            }
          });
        });
      };

      const paths = await getSongsFromDB();
      const songs: ISongData[] = [];

      for (const file of paths) {
        const metaData: mm.IAudioMetadata = await mm.parseFile(file);
        const src = `/music/${path.basename(file)}`;
        const songData: ISongData = { metaData, src };
        songs.push(songData);
      }

      return songs;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
