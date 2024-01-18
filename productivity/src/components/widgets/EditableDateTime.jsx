import React, { useState } from 'react';
import { format, nextDay, parse, startOfToday } from 'date-fns';

// Optionally import a date picker library
import DatePickerDemo from './DatePicker'

const EditableDateTime = () => {
    const [editMode, setEditMode] = useState(true);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleDateSelected = (selectedDate) => {
        setDate(format(selectedDate, 'M/dd/yyyy'));
    };
    
    /* Handle change to Date input and parse the intended Date from several abbreviated forms and different formats
    */
    const handleDateChange = (e) => {
        const value = e.target.value;
        let newDate = null;
      
        // 1. CHECK IF INPUT IS A WEEKDAY
        const weekdays = {
          'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 0
        };
        
        // 2. COMMON ABBREVIATIONS
        const abbreviations = {
          'tod': 0, 'tom': 1, 'yes': -1
        };
      
        // 3. MONTHS OBJECT
        const months = {
          'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
          'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };
      
        const inputLower = value.toLowerCase();
        if (weekdays.hasOwnProperty(inputLower) || abbreviations.hasOwnProperty(inputLower)) {
          if (weekdays.hasOwnProperty(inputLower)) {
            const weekday = weekdays[inputLower];
            newDate = nextDay(startOfToday(), weekday);
          } else {
            const abbreviationValue = abbreviations[inputLower];
            if (abbreviationValue === 0) {
              newDate = startOfToday(); // Today
            } else if (abbreviationValue === 1) {
                newDate = new Date(); // Tomorrow
            newDate.setDate(newDate.getDate() + 1);
                } else if (abbreviationValue === -1) {
                    newDate = new Date(); // Yesterday
            newDate.setDate(newDate.getDate() - 1);
            }
          }
          console.log(newDate)
        } else if (months.hasOwnProperty(inputLower)) {
          const month = months[inputLower];
          let day = 1;
      
          // Try to parse a number preceding the characters as the day value
          const match = value.match(/(\d{1,2})?[a-z]+/i);
          if (match) {
            const matchedDay = parseInt(match[1]);
            if (!isNaN(matchedDay)) {
              day = matchedDay;
            }
          }
      
          // Check if the input contains a year
          const yearMatch = value.match(/\b\d{4}\b/);
          const currentYear = new Date().getFullYear();
          const year = yearMatch ? parseInt(yearMatch[0]) : currentYear;

          newDate = new Date(year, month, day);

          console.log(newDate)
        } else {
          // Try to parse the input as a date
          try {
            const inputDateParts = value.split('/');
            if (inputDateParts.length === 2) {
              const month = parseInt(inputDateParts[0]) - 1; // Adjust for zero-based months
              const day = parseInt(inputDateParts[1]);
              
              if (!isNaN(month) && !isNaN(day)) {
                // Set the year to the current year if it's not provided
                const currentYear = new Date().getFullYear();
                newDate = new Date(currentYear, month, day);
              }
            } else {
              const parsedDate = parse(value, 'M/dd/yyyy', new Date());
              if (!isNaN(parsedDate)) {
                newDate = parsedDate;
              }
            }
          } catch (error) {
            console.error('Invalid date format');
            // Optionally handle error or invalid input
          }
        }
      
        if (newDate) {
          setDate(format(newDate, 'M/dd/yyyy'));
        } else {
          // Optionally, handle invalid input, e.g., by clearing the date or showing an error message
          // setDate(''); // Uncomment this line if you want to clear the date on invalid input
        }
      };

    const handleTimeChange = (e) => {
        const value = e.target.value.trim();
        let newTime;
    
        if (/^\d{1,2}(:\d{2})?[ap]m$/.test(value)) {
            // Matches "10am", "6:00pm", etc.
            try {
                const timeParts = value.match(/^(\d{1,2})(?::(\d{2}))?([ap]m)$/);
                let hours = parseInt(timeParts[1]);
                const minutes = timeParts[2] ? parseInt(timeParts[2]) : 0;
                const ampm = timeParts[3];
    
                if (ampm === 'pm' && hours < 12) hours += 12;
                if (ampm === 'am' && hours === 12) hours = 0;
    
                newTime = new Date();
                newTime.setHours(hours, minutes, 0);
            } catch (error) {
                console.error('Invalid time format');
                return; // Or handle error differently
            }
        } else {
            console.error('Invalid time format');
            return;
        }
    
        setTime(format(newTime, 'h:mm a'));
    };
    

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
  {editMode ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DatePickerDemo onDateSelected={handleDateSelected} />
      <div style={{ display: "flex", flexDirection: "row", marginLeft: "25px" }}>
        <input
          type="text"
          onChange={handleDateChange}
          placeholder="Today"
          style={{ width: "140px", fontSize: "14px", padding: "3px", borderRadius: '5px' }} // Adjust the width as needed
        />
        <input
          type="text"
          onChange={handleTimeChange}
          placeholder="12"
          style={{ width: "140px", fontSize: "14px", marginLeft: "5px", padding: "3px", borderRadius: '5px'}} // Adjust the width as needed
        />
      </div>
    </div>
  ) : (
    <span onClick={() => setEditMode(true)}>
      {date} {time}
    </span>
  )}
</div>

    );
};

export default EditableDateTime;