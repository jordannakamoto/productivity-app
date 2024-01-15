// Assignments API
// Accessed by Index

import { getDb } from '@/db/dbInstance';

const db = await getDb();

// Create (Insert)
const AssignmentAPI = {
  create: async (assignment) => {
    await db.execute(
      "INSERT INTO assignments (class_id, index, name, description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)",
      [assignment.class_id, assignment.index, assignment.name, assignment.description, assignment.status, assignment.due_date]
    );
  },

  read: async (assignmentIndex) => {
    return await db.query(
      "SELECT * FROM assignments WHERE index = ?",
      [assignmentIndex]
    );
  },

  readAll: async () => {
    return await db.query("SELECT * FROM assignments");
  },

  // update by index
  update: async (assignment) => {
    await db.execute(
      "UPDATE assignments SET class_id = ?, name = ?, description = ?, status = ?, due_date = ? WHERE index = ?",
      [assignment.class_id, assignment.name, assignment.description, assignment.status, assignment.due_date, assignment.index]
    );
  },

  // update by index
  delete: async (assignmentIndex) => {
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
    await db.execute(
      "INSERT INTO assignment_links (assignment_index, index, link_type, link_name, url) VALUES (?, ?, ?, ?, ?)",
      [link.assignment_id, link.index, link.link_type, link.link_name, link.url]
    );
  },

  // Read a link based on assignment index and link index
  read: async (assignmentIndex, linkIndex) => {
    return await db.query(
      "SELECT * FROM assignment_links WHERE assignment_index = ? AND index = ?",
      [assignmentIndex, linkIndex]
    );
  },

  readAll: async () => {
    return await db.query("SELECT * FROM assignment_links");
  },

  update: async (link) => {
    await db.execute(
      "UPDATE assignment_links SET assignment_index = ?, link_type = ?, link_name = ?, url = ? WHERE index = ?",
      [link.assignment_index, link.link_type, link.link_name, link.url, link.index]
    );
  },

  // Delete a link based on assignment index and link index
  delete: async (assignmentIndex, linkIndex) => {
    await db.execute(
      "DELETE FROM assignment_links WHERE assignment_index = ? AND index = ?",
      [assignmentIndex, linkIndex]
    );
  }
};



export { AssignmentAPI, AssignmentLinkAPI };