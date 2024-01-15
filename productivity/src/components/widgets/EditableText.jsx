import React, { useState } from 'react';

const EditableText = ({ initialValue, onFieldUpdate, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      autoFocus
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{value}</div>
  );
};

export default EditableText