import * as SQLite from 'expo-sqlite';
import { DrinkLog } from '../types';

const db = SQLite.openDatabaseSync('cruise_drinks.db');

export const initDb = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS drinks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      barId TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      price REAL NOT NULL,
      isAlcoholic INTEGER DEFAULT 1,
      favorite INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
};

export const addDrink = (drink: Omit<DrinkLog, 'id'>) => {
  db.runSync(
    'INSERT INTO drinks (name, barId, timestamp, price, isAlcoholic, favorite) VALUES (?, ?, ?, ?, ?, ?)',
    [drink.name, drink.barId, drink.timestamp, drink.price, drink.isAlcoholic, drink.favorite]
  );
};

export const getDrinks = (): DrinkLog[] => db.getAllSync('SELECT * FROM drinks ORDER BY timestamp DESC') as DrinkLog[];

export const deleteDrink = (id: number) => db.runSync('DELETE FROM drinks WHERE id = ?', [id]);
