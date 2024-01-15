// dbInstance.js
import Database from "tauri-plugin-sql-api";

let db;

const initDb = async () => {
  if (!db) {
    db = await Database.load("sqlite:test.db");
  }
  return db;
};

export const getDb = async () => {
  if (!db) {
    return await initDb();
  }
  return db;
};