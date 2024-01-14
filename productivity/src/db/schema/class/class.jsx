CREATE TABLE IF NOT EXISTS class (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  time TEXT,
  teacher TEXT,
  office_hours TEXT,
  location TEXT,
  textbook TEXT,
  grade TEXT
);
