'use client'

import React, { useEffect } from 'react';

import Database from "tauri-plugin-sql-api";

function DatabaseSetup() {
  // Function to run a SQL query
  const createTables = async () => {
    try {
        const db = await Database.load("sqlite:test.db");

        const sqlCommands = [
          `CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            order_index INTEGER,
            name TEXT,
            description TEXT,
            status TEXT,
            due_date DATE,
            FOREIGN KEY (class_id) REFERENCES class(id)
          );`,
          `CREATE TABLE IF NOT EXISTS assignment_links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            assignment_id INTEGER NOT NULL,
            order_index INTEGER,
            link_type TEXT,
            link_name TEXT,
            url TEXT,
            FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE
          );`,
          `CREATE TABLE IF NOT EXISTS class (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            time TEXT,
            teacher TEXT,
            office_hours TEXT,
            location TEXT,
            textbook TEXT,
            grade TEXT
          );`,
          `CREATE TABLE IF NOT EXISTS test_dates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            name TEXT,
            test_date DATE,
            FOREIGN KEY (class_id) REFERENCES class(id)
          );`
        ];
      
        try {
          for (const sqlCommand of sqlCommands) {
            await db.execute(sqlCommand);
          }
          console.log("Database tables created successfully.");
        } catch (error) {
          console.error('Error executing sqlCommands for Creating Tables:', error);
        }
    } catch (error) {
      console.error('Error Creating Tables:', error);
    }
  };

  // Initialize the database
  useEffect(() => {
    const initializeDatabase = async () => {
        await createTables();
    };

    initializeDatabase();
  }, []);

  return null;
}

export default DatabaseSetup;
