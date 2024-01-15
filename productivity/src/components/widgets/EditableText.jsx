import React, { useEffect, useRef, useState } from 'react';

const EditableText = ({ initialValue, onFieldUpdate, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const padding = 4; // You may adjust this value as needed
  
      textareaRef.current.style.height = '0'; // Reset height to auto to calculate the new height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + padding}px`;
    }
  }, [isEditing, value]);

  const handleDoubleClick = () => {
    setIsEditing(true);
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
  };

  return isEditing ? (
    <textarea
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      autoFocus
      style={inputStyle}
      ref={textareaRef}
      spellCheck="false" // Disable spellcheck
    />
  ) : (
    <div onDoubleClick={handleDoubleClick} style={inputStyle}>
      {value}
    </div>
  );
};

export default EditableText;
