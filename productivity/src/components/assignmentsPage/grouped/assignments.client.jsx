'use client'

import { AssignmentAPI, AssignmentLinkAPI } from '@/db/api/assignment';
import React, { useEffect, useState } from 'react';

import AssignmentCard from '../single/assignment_card';

const Assignments = () => {
  const handleUpdate = async (assignmentId, fieldName, newValue) => {
    // Update the assignment in the state
    // Call API to update the database
    await AssignmentAPI.updateAssignment(assignmentId, fieldName, newValue);
    // Optionally, update local state to reflect changes
};

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const fetchedAssignments = await AssignmentAPI.readAll();
        setAssignments(fetchedAssignments);
        console.log(fetchedAssignments)
      } catch (error) {
        console.error("Error fetching assignments:", error);
        // Optionally, set an error state here and display an error message
      }
    };

    fetchAssignments();
  }, []);

  // Display a message if there are no assignments
  if (assignments.length === 0) {
    return <div className="text-center py-4">No assignments available.</div>;
  }

  return (
    <section className="flex-1 overflow-y-auto p-4">
      {assignments.map((assignment, index) => (
            <div key={index} className="p-2">
                <AssignmentCard assignment={assignment} onUpdate={handleUpdate} />
            </div>
        ))}
    </section>
  );
};

export default Assignments;
  