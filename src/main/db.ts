<<<<<<< HEAD
import { dirname, join  } from 'path';
=======
import { dirname, join } from 'path';
>>>>>>> 18ad7a1de632c9ad762803e4ec0bddfcceb7bf0c
import fs from 'fs';
import sqlite3, { Database } from 'sqlite3';
import { fileURLToPath } from 'url';
sqlite3.verbose();

export const initializeDB = (): Database | null => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const dbDir = join(__dirname, '../database');

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = join(dbDir, 'db.sqlite');
    const db = new sqlite3.Database(dbPath, (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log('Connected to the database');
      }
    });

    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS allSongs (id INTEGER PRIMARY KEY, src TEXT)');
      db.run('CREATE TABLE IF NOT EXISTS favoriteSongs (id INTEGER PRIMARY KEY, src TEXT)');
      db.run(
        'CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY, src TEXT, lastPlayed DATE, emotion TEXT)'
      );
    });
    return db;
  } catch (error) {
    console.error(error);
    return null;
  }
};
