import { dirname, join  } from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
sqlite3.verbose();

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbDir = join(__dirname, '../../database');

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

db.serialize(()  => {
    db.run('CREATE TABLE IF NOT EXISTS allSongs (id INTEGER PRIMARY KEY, src TEXT)');   
    db.run('CREATE TABLE IF NOT EXISTS favoriteSongs (id INTEGER PRIMARY KEY, src TEXT)');   
})

export default db;
