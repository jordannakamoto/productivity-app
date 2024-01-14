CREATE TABLE IF NOT EXISTS test_dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER,
    name TEXT,
    test_date DATE,
    FOREIGN KEY (class_id) REFERENCES class(id)
  );