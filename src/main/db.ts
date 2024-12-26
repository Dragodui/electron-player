import { resolve } from 'path';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const dbPath = resolve(new URL(import.meta.url).pathname, '../../database/db.sqlite');
const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error(error.message);
  }
  else {
    console.log('Connected to the database');
  }
})

export default db;