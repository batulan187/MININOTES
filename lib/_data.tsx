import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

export interface Note {
  id: string;
  title: string;
  category: string;
  detail: string;
  status: string;
}

export const db = SQLite.openDatabaseSync("notes.db");

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        detail TEXT
      );
    `);

    try {
      db.execSync(
        `ALTER TABLE notes ADD COLUMN status TEXT DEFAULT 'Pending';`,
      );
    } catch (e) {
      
      
    }
  } catch (error) {
    console.error("Db Init Error:", error);
  }
};

export const executeSql = (sql: string, params: any[] = []) => {
  try {
    return db.runSync(sql, params);
  } catch (error) {
    console.error(`SQL Error [${sql}]:`, error);
    const msg = error instanceof Error ? error.message : "Unknown Error";
    Alert.alert("Database Error", msg);
    throw error;
  }
};

export default function Dummy() {
  return null;
}
