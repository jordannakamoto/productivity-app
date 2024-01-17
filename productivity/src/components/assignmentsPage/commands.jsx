import { LogicalSize, getCurrent } from '@tauri-apps/api/window';
import React, { useEffect } from 'react';

import { AssignmentAPI } from '@/db/api/assignment';

const Commands = ({ setAssignments, assignments }) => {

    // Testing smoothResize for switching to calendar view etc.
    async function smoothResize(newWidth, newHeight, duration) {
        const stepTime = 10;
        const totalSteps = duration / stepTime;
        const win = await getCurrent();
        const currentSize = await win.innerSize();
        const stepX = (newWidth - currentSize.width) / totalSteps;
        const stepY = (newHeight - currentSize.height) / totalSteps;
        
        let currentStep = 0;
        const resizeInterval = setInterval(async () => {
            if (currentStep < totalSteps) {
                await win.setSize(new LogicalSize(
                    currentSize.width + stepX * currentStep,
                    currentSize.height + stepY * currentStep
                ));
                currentStep++;
            } else {
                clearInterval(resizeInterval);
            }
        }, stepTime);
    }

  const handleCreateNewAssignment = async () => {

    try {
        // Define the data for the new assignment in the correct format
        const newAssignmentData = {
            class_id: 1, // Replace with the actual class_id value
            "index": assignments.length, // Replace with the actual index value
            name: 'New Assignment', // Replace with the actual assignment name
            description: 'This is a new assignment.', // Replace with the actual description
            status: 'Not Started', // Replace with the actual status
            due_date: '2024-01-30', // Replace with the actual due date
          };
  
        // Call AssignmentAPI.create() with the assignment data
        const lastInsertId = await AssignmentAPI.create(newAssignmentData);
  
        // Update the state with the new assignment (if needed)
        // Note: You may want to fetch and update the assignments list after creating the assignment
        newAssignmentData.id = lastInsertId;
        // Optionally, update the state or perform other actions after creating the assignment
        setAssignments([...assignments, newAssignmentData]);

        setTimeout(() => {
            const textCardForegrounds = document.querySelectorAll('.text-card-foreground');
            if (textCardForegrounds.length > 0) {
                const lastTextCardForeground = textCardForegrounds[textCardForegrounds.length - 1];
                lastTextCardForeground.classList.add('fadeIn');
                // Listen for the animationend event
                lastTextCardForeground.addEventListener('animationend', () => {
                // Remove the fadeIn class once the animation is complete
                lastTextCardForeground.classList.remove('fadeIn');
        });
            }
          }, 10); // Adjust the delay as needed

      } catch (error) {
        console.error('Error creating a new assignment:', error);
        // Optionally, handle and display an error message
      }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the key combination is 'Cmd + N' on macOS or 'Ctrl + N' on Windows/Linux
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        console.log("test")
        handleCreateNewAssignment(); // Call the local function to create a new assignment
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 't') {
        console.log("test")
        smoothResize(1000,1000,200); // Call the local function to create a new assignment
      }
    };

    // Attach the event listener to the document
    document.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [assignments, setAssignments]);

  return null; // This component doesn't render anything
};

export default Commands;
