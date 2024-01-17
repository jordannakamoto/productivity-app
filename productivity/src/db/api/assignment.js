// Assignments API
// Accessed by Index

import { getDb } from '@/db/dbInstance';

// Create (Insert)
const AssignmentAPI = {
  create: async (assignment) => {
    const db = await getDb();
    const result = await db.execute(
      'INSERT INTO assignments (class_id, "index", name, description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [assignment.class_id, assignment.index, assignment.name, assignment.description, assignment.status, assignment.due_date]
    );
    return result.lastInsertId; // return ID
  },

  read: async (assignmentIndex) => {
    const db = await getDb();
    return await db.select(
      "SELECT * FROM assignments WHERE index = ?",
      [assignmentIndex]
    );
  },

  readAll: async (filters = {}) => {
    const db = await getDb();
    let query = "SELECT * FROM assignments";
  
    if (filters.statusFilter !== undefined) {
      // Add a WHERE clause to filter by status where it's not equal to the provided status
      query += ` WHERE status != '${filters.statusFilter}'`;
    }
    const result = await db.select(query)
    console.log(result)
    return result;
  },
  
  

  // update by index
  update: async (assignment) => {
    const db = await getDb();
    await db.execute(
      "UPDATE assignments SET class_id = ?, name = ?, description = ?, status = ?, due_date = ? WHERE index = ?",
      [assignment.class_id, assignment.name, assignment.description, assignment.status, assignment.due_date, assignment.index]
    );
  },
  
  // update value by id
  updateAssignment: async (assignmentId, fieldName, newValue) => {
    const db = await getDb();
    const query = `UPDATE assignments SET ${fieldName} = ? WHERE id = ?`;
    await db.execute(query, [newValue, assignmentId]);
  },

  // update by index
  delete: async (assignmentIndex) => {
    const db = await getDb();
    await db.execute(
      "DELETE FROM assignments WHERE index = ?",
      [assignmentIndex]
    );
  }
};

// Assignment Link API
// Accessed by assignment index and link index
const AssignmentLinkAPI = {
  create: async (link) => {
    const db = await getDb();
    await db.execute(
      "INSERT INTO assignment_links (assignment_index, index, link_type, link_name, url) VALUES (?, ?, ?, ?, ?)",
      [link.assignment_id, link.index, link.link_type, link.link_name, link.url]
    );
  },

  // Read a link based on assignment index and link index
  read: async (assignmentIndex, linkIndex) => {
    const db = await getDb();
    return await db.execute(
      "SELECT * FROM assignment_links WHERE assignment_index = ? AND index = ?",
      [assignmentIndex, linkIndex]
    );
  },

  readAll: async () => {
    const db = await getDb();
    return await db.execute("SELECT * FROM assignment_links");
  },

  update: async (link) => {
    const db = await getDb();
    await db.execute(
      "UPDATE assignment_links SET assignment_index = ?, link_type = ?, link_name = ?, url = ? WHERE index = ?",
      [link.assignment_index, link.link_type, link.link_name, link.url, link.index]
    );
  },

  // Delete a link based on assignment index and link index
  delete: async (assignmentIndex, linkIndex) => {
    const db = await getDb();
    await db.execute(
      "DELETE FROM assignment_links WHERE assignment_index = ? AND index = ?",
      [assignmentIndex, linkIndex]
    );
  }
};



export { AssignmentAPI, AssignmentLinkAPI };