'use client'

// Client side assignment sorting once its loaded

import { AssignmentAPI, AssignmentLinkAPI } from '@/db/api/assignment';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

import AssignmentCard from '../single/assignment_card';

const Assignments = () => {
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const reorderedAssignments = [...assignments];
    const [movedAssignment] = reorderedAssignments.splice(result.source.index, 1);
    reorderedAssignments.splice(result.destination.index, 0, movedAssignment);
  
      // Update the index for each assignment
    const updatedAssignments = reorderedAssignments.map((assignment, index) => ({
      ...assignment,
      index: index
    }));

    // Update the state with the new order of assignments
    setAssignments(updatedAssignments);

    // Update the backend with the new indices

    // index is a reserved word by sql so need to surround by double quotes
    updatedAssignments.forEach(async (assignment) => {
      await AssignmentAPI.updateAssignment(assignment.id, '"index"', assignment.index);
    });
  };

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
        let fetchedAssignments = await AssignmentAPI.readAll();
        setAssignments(fetchedAssignments);
        fetchedAssignments = fetchedAssignments.sort((a, b) => a.index - b.index);
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <section id="assignments" className="flex-1 overflow-y-auto p-4">
        <Droppable droppableId="assignmentList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {assignments.map((assignment, index) => (
                <Draggable
                  key={assignment.id} // Use a unique identifier for each assignment
                  draggableId={assignment.id.toString()} // Use a unique identifier for each assignment
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ marginTop: '10px', ...provided.draggableProps.style }} // Adding a top margin
                    >
                      <AssignmentCard assignment={assignment} onUpdate={handleUpdate} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
};

export default Assignments;
  