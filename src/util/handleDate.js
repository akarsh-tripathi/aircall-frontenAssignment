// Format the date to be more readable.
export const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(dateString));
};

// Function to format date object to time string
export const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { timeStyle: 'short' });
};

export const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    let result = "";
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0 || hours > 0) result += `${minutes}m `;
    result += `${seconds}s`;

    return result.trim();
};




// Function to group calls by date
export const groupCallsByDate = (calls) => {
    const grouped = {};
    calls.forEach(call => {
        const date = formatDate(call.created_at);
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(call);
    });

    // Sort groups by date keys
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
    return sortedDates.map(date => ({ date, calls: grouped[date] }));
};
