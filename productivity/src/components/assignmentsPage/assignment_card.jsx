import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CalculateDueDate from "@/calculations/CalculateDueDate";
import EditableText from '@/components/widgets/EditableText';
import React from 'react';

const AssignmentCard = ({ assignment, onUpdate }) => {
    const dueDate = CalculateDueDate(assignment.due_date);

    const handleFieldUpdate = (fieldName, newValue) => {
        onUpdate(assignment.id, fieldName, newValue);
    };

    return (
        <Card className="px-2 bg-white bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-75 shadow-none border-0 rounded">
            <CardHeader>
                <EditableText
                    initialValue={assignment.name}
                    onFieldUpdate={(field, newValue) => handleFieldUpdate(field, newValue)}
                    fieldName="name"
                />
            </CardHeader>
            <div className="inline-block bg-gray-500 text-xs text-white py-1 px-2 rounded-full ml-6">
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
