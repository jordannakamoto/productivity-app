CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER,
    order_index INTEGER,
    name TEXT,
    description TEXT,
    status TEXT,
    due_date DATE,
    FOREIGN KEY (class_id) REFERENCES class(id)
  );
  
  CREATE TABLE IF NOT EXISTS assignment_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id INTEGER NOT NULL,
    order_index INTEGER,
    link_type TEXT,
    link_name TEXT,
    url TEXT,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE
  );