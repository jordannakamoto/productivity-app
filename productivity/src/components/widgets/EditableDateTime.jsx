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
    
    const handleDateChange = (e) => {
        const value = e.target.value;
        let newDate = null;
    
        // Check if the input is a weekday name
        const weekdays = {
            'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 0
        };
        if (weekdays.hasOwnProperty(value)) {
            newDate = nextDay(startOfToday(), weekdays[value]);
        } else {
            // Try to parse the input as a date
            try {
                const parsedDate = parse(value, 'M/dd/yyyy', new Date());
                if (!isNaN(parsedDate)) newDate = parsedDate; // Check if parsedDate is a valid date
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
        <div>
            {editMode ? (
                <div>
                    <DatePickerDemo onDateSelected={handleDateSelected} />
                    <input 
                        type="text" 
                        onChange={handleDateChange}
                        placeholder="Date (e.g., Mon, 01/01/2024)" 
                    />
                    <input 
                        type="text" 
                        onChange={handleTimeChange}
                        placeholder="Time (e.g., 10am, 6:00pm)" 
                    />
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