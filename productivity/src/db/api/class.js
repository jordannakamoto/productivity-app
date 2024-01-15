import { getDb } from '@/db/dbInstance';

const db = await getDb();

const ClassAPI = {
  create: async (classData) => {
    await db.execute(
      "INSERT INTO class (name, time, teacher, office_hours, location, textbook, grade, index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [classData.name, classData.time, classData.teacher, classData.office_hours, classData.location, classData.textbook, classData.grade, classData.index]
    );
  },

  read: async (classIndex) => {
    return await db.query(
      "SELECT * FROM class WHERE index = ?",
      [classIndex]
    );
  },

  readAll: async () => {
    return await db.query("SELECT * FROM class");
  },

  update: async (classData) => {
    await db.execute(
      "UPDATE class SET name = ?, time = ?, teacher = ?, office_hours = ?, location = ?, textbook = ?, grade = ? WHERE index = ?",
      [classData.name, classData.time, classData.teacher, classData.office_hours, classData.location, classData.textbook, classData.grade, classData.index]
    );
  },

  delete: async (classIndex) => {
    await db.execute(
      "DELETE FROM class WHERE index = ?",
      [classIndex]
    );
  }
};

const TestDatesAPI = {
    create: async (testDate) => {
      await db.execute(
        "INSERT INTO test_dates (class_index, name, test_date) VALUES (?, ?, ?)",
        [testDate.class_index, testDate.name, testDate.test_date]
      );
    },
  
    read: async (classIndex, name, testDate) => {
      return await db.query(
        "SELECT * FROM test_dates WHERE class_index = ? AND name = ? AND test_date = ?",
        [classIndex, name, testDate]
      );
    },
  
    readAll: async () => {
      return await db.query("SELECT * FROM test_dates");
    },
  
    update: async (testDate) => {
        await db.execute(
          "UPDATE test_dates SET name = ? WHERE class_index = ? AND test_date = ? AND name = ?",
          [testDate.newName, testDate.class_index, testDate.test_date, testDate.name]
        );
      },
  
    delete: async (classIndex, testDateName, testDate) => {
    await db.execute(
        "DELETE FROM test_dates WHERE class_index = ? AND name = ? AND test_date = ?",
        [classIndex, testDateName, testDate]
    );
    },
  };

  export { ClassAPI, TestDatesAPI };
