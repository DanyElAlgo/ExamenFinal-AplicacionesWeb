export function formatDateTime(dateTime) {
    
    let formattedDateTime = "";
    const monthAbbreviations = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = monthAbbreviations[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    let day = "";

    const dayNumber = dateTime.getDate();
    const remainder = dayNumber % 10;

    if(remainder == 1 && (dayNumber < 10 || dayNumber > 13))
        day = `${dayNumber}st`;
    else if(remainder == 2 && (dayNumber < 10 || dayNumber > 13))
        day = `${dayNumber}nd`;
    else if(remainder == 3 && (dayNumber < 10 || dayNumber > 13))
        day = `${dayNumber}rd`;
    else
        day = `${dayNumber}th`;

    formattedDateTime = `${day} ${month} ${year}`;
    
    return formattedDateTime;
}