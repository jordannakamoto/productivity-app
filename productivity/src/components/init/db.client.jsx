'use client'

import React, { useEffect } from 'react';

import Database from "tauri-plugin-sql-api";

const { invoke } = require('@tauri-apps/api/tauri');

function DatabaseTest() {
  // Function to run a SQL query
  const runSqlQuery = async () => {
    try {
        const db = await Database.load("sqlite:test.db");

        await db.execute(
            "CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, name TEXT)"
          );
      
          // INSERT example
          const insertResult = await db.execute(
            "INSERT INTO test_table (name) VALUES ($1)",
            ['Test Name']
          );
          console.log('Insert Result:', insertResult);
      
          // UPDATE example
          const updateResult = await db.execute(
            "UPDATE test_table SET name = $1 WHERE id = $2",
            ['Updated Name', 1]
          );
          console.log('Update Result:', updateResult);
      
          // SELECT example to check the data
          const selectResult = await db.execute(
            "SELECT * FROM test_table"
          );
          console.log('Select Result:', selectResult);
    } catch (error) {
      console.error('Error running query:', error);
    }
  };

  // Initialize the database
  useEffect(() => {
    const initializeDatabase = async () => {
        await runSqlQuery();
    };

    initializeDatabase();
  }, []);

  return null;
}

export default DatabaseTest;
