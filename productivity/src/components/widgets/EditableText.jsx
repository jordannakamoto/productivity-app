import React, { useEffect, useRef, useState } from 'react';

const EditableText = ({ initialValue, onFieldUpdate, fieldName, fontSize }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  const setHeight = () => {
    const padding = 4; // You may adjust this value as needed
  
      textareaRef.current.style.height = '0'; // Reset height to auto to calculate the new height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + padding}px`;
  }
  useEffect(() => {
    setHeight();
  }, []);
  
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      setHeight();
    }
  }, [isEditing, value]);

  const handleEditClick = (e) => {
    if (e.metaKey) {
      e.preventDefault();
      setIsEditing(true);
      e.target.readOnly = false;
      e.target.focus();
    } else {
      // Toggle the readOnly attribute based on isEditing
      if(!isEditing){
        e.preventDefault();
        e.target.readOnly = true;
      }
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    if (value !== initialValue) {
      onFieldUpdate(fieldName, value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Enter without Shift key pressed, blur the input
      e.preventDefault();
      textareaRef.current.blur();
    }
  };

  const inputStyle = {
    backgroundColor: isEditing ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
    border: isEditing ? '2px solid white' : '2px solid transparent', // Outer border
    borderRadius: '2px',
    padding: '2px',
    width: '100%', // Expand to full width
    resize: 'none', // Disable textarea resizing
    overflowY: 'hidden', // Hide vertical scrollbar
    outline: 'none', // Hide focus outline
    whiteSpace: 'pre-wrap', // Allow text to wrap
    WebkitBoxSizing: 'border-box', /* Safari/Chrome, other WebKit */
    MozBoxSizing: 'border-box',    /* Firefox, other Gecko */
    boxSizing: 'border-box',   
    display: 'flex',
    fontSize: fontSize || 'inherit',
    cursor: isEditing ? 'default': 'pointer',
  };

  return (
    <textarea
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onClick={handleEditClick}
      onKeyDown={handleKeyDown}
      style={inputStyle}
      ref={textareaRef}
      spellCheck="false"
      autoFocus
    />
  );
};

export default EditableText;
