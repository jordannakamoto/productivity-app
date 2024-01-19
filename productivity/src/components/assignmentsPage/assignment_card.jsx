import './styles.css';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useRef, useState } from 'react';

import CalculateDueDate from "@/calculations/CalculateDueDate";
import EditableDateTime from '@/components/widgets/EditableDateTime';
import EditableText from '@/components/widgets/EditableText';
import Lottie from 'lottie-react';
import animationData from './anim_checkmark.json';

const AssignmentCard = ({ assignment, onUpdate, onDelete }) => {

    const cardRef = useRef(null);
    const lottieRef = useRef(null);
    const [animationStyle, setAnimationStyle] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    

    const dueDate = CalculateDueDate(assignment.due_date);

    const handleMouseDown = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
    
        let isDragOperation = false;
    
        let holdTimer; // Declare holdTimer here
        let innerTimeout; // Declare innerTimeout here
    
        const handleMouseMove = (moveEvent) => {
            const currentX = moveEvent.clientX;
            const currentY = moveEvent.clientY;
    
            // Check if the mouse has moved significantly
            if (Math.abs(currentX - mouseX) > 5 || Math.abs(currentY - mouseY) > 5) {
                // The mouse has moved, indicating a drag operation
                isDragOperation = true;
    
                // Remove the mousemove listener to stop tracking
                document.removeEventListener('mousemove', handleMouseMove);
    
                // Cancel the holdTimer and the innerTimeout
                clearTimeout(holdTimer);
                clearTimeout(innerTimeout);
                setIsAnimating(false);
    
                // Exit the function to prevent animation and click actions
                return;
            }
        };
    
        // Add a mousemove listener to track mouse movement
        document.addEventListener('mousemove', handleMouseMove);
    
        // Start the holdTimer
        holdTimer = setTimeout(() => {
            // Remove the mousemove listener after the delay
    
            // Check if it's a drag operation
            if (isDragOperation) {
                // Handle drag operation (if needed)
                return;
            }
    
            // Continue with the click operation
            if (event.buttons === 1) {
                // Mouse button is still pressed, indicating a click
                setAnimationStyle({
                    position: 'absolute',
                    left: mouseX - 40,
                    top: mouseY - 60,
                    width: 100, // Adjust size as needed
                    height: 100, // Adjust size as needed
                });
                setIsAnimating(true); // Start animation
    
                // Set the inner setTimeout to a variable
                innerTimeout = setTimeout(() => {
                    onUpdate(assignment.id, 'status', 'completed');
                    setIsFadingOut(true);
                    setTimeout(() => {
                        handleDelete();
                    }, 250);
                }, 800);
            }
        }, 200); // Delay in milliseconds (e.g., 200ms)
    
        // Add a mouseup listener to track when the mouse button is released
        const handleMouseUp = () => {
            clearTimeout(holdTimer);
            clearTimeout(innerTimeout);
            setIsAnimating(false);
    
            // Remove the mousemove and mouseup listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
    
            // Reset the position or handle other click-related logic
        };  
    
        // Add a mouseup listener to track when the mouse button is released
        document.addEventListener('mouseup', handleMouseUp);
    };
    
    

    const animationEnd = () => {
        setIsAnimating(false);
        // setIsFadingOut(false);
        // Additional logic after animation ends
    };

    const handleFieldUpdate = (fieldName, newValue) => {
        onUpdate(assignment.id, fieldName, newValue);
    };

    const handleDelete = () => {
        const cardHeight = cardRef.current.offsetHeight;
        let parentElement = cardRef.current.parentNode;
        let nextParentElement = parentElement.nextElementSibling;
    
        // Apply the transform to move other elements up
        while (nextParentElement) {
            const nextCard = nextParentElement.querySelector('.card-transition');
            if (nextCard) {
                nextCard.style.transform = `translateY(-${cardHeight}px)`;
            }
            nextParentElement = nextParentElement.nextElementSibling;
        }
        setTimeout(() => {
            nextParentElement = parentElement.nextElementSibling;
            while (nextParentElement) {
                const nextCard = nextParentElement.querySelector('.card-transition');
                if (nextCard) {
                    nextCard.style.transition = ('none');
                    nextCard.style.transform = 'none';
                    setTimeout(() => {
                        nextCard.style.transition = 'transform 0.2s ease-in';
                    }, 10); // A short delay to ensure the transition is reapplied
                }
                nextParentElement = nextParentElement.nextElementSibling;
            }
            onDelete(assignment.id);
            // Update your React state here if necessary
        }, 200);// Same length as animation length
    };
    

    return (
        <Card ref={cardRef}
            className={`card-transition px-2 bg-white bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-75 shadow-none border-0 rounded ${isFadingOut ? 'fadeOut' : ''}`}
            onMouseDown={handleMouseDown} 
            onAnimationEnd={animationEnd}
        >
            {isAnimating && (
                <>
                    <div style={animationStyle}>
                    <Lottie ref={lottieRef} animationData={animationData} loop={false}
                    />
                </div>
                    </>
                )}
            <CardHeader>
                <EditableText
                    initialValue={assignment.name}
                    onFieldUpdate={(field, newValue) => handleFieldUpdate(field, newValue)}
                    fieldName="name"
                />
            </CardHeader>
            <EditableDateTime/>
            <div className="inline-block bg-gray-400 text-xs text-white py-1 px-2 rounded-full ml-6">
                {dueDate}
            </div>
            <CardContent>
                <EditableText
                    initialValue={assignment.description}
                    onFieldUpdate={(field, newValue) => handleFieldUpdate(field, newValue)}
                    fieldName="description"
                    fontSize="13px"
                />
            </CardContent>
        </Card>
    );
};

export default AssignmentCard;
