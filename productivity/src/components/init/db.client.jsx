'use client'

import React, { useEffect } from 'react';
const { invoke } = require('@tauri-apps/api/tauri');

function DatabaseTest() {
  // Function to run a SQL query
  const runSqlQuery = async (query) => {
    try {
      const result = await invoke('plugin:sql|execute', { query });
      alert('Query Result:', result);
      return result;
    } catch (error) {
      console.error('Error running query:', error);
    }
  };

  // Initialize the database
  useEffect(() => {
    const initializeDatabase = async () => {
      // Create a table
      await runSqlQuery(`CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, name TEXT)`);

      // Insert some data
      await runSqlQuery(`INSERT INTO test_table (name) VALUES ('Test Name')`);

      // Query the data
      await runSqlQuery(`SELECT * FROM test_table`);
    };

    initializeDatabase();
  }, []);

  return null;
}

export default DatabaseTest;
