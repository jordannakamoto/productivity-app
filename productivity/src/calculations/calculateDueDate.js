const calculateDueDate = (dueDateString) => {
    const currentDate = new Date();
    const dueDate = new Date(dueDateString);

    const timeDiff = dueDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff > 0 ? `${daysDiff} days` : `Due date passed`;
};

export default calculateDueDate;
