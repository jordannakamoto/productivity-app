import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CalculateDueDate from "@/calculations/CalculateDueDate";
import React from 'react';

const AssignmentCard = ({ assignment }) => {
    // Logic to calculate and format due date
    const dueDate = CalculateDueDate(assignment.due_date);

    return (
        <Card className="px-2 bg-white bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-75 shadow-none border-0 rounded">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg text-gray-500">{assignment.name}</CardTitle>
                <span className="inline-block bg-gray-500 text-xs text-white py-1 px-2 rounded-full">
                    Due: {dueDate}
                </span>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500">
                    {assignment.description}
                </p>
            </CardContent>
        </Card>
    );
};

export default AssignmentCard;
