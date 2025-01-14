function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const isPM = hours >= 12;

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 -> 12)

    // Format minutes with leading zero
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    // Append AM/PM
    const timeString = `${hours}:${minutesStr} ${isPM ? 'PM' : 'AM'}`;
    $('#clock').text(timeString);

    const currentMonth = now.getMonth(); // getMonth() returns 0-11

    const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 
        'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 
        'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];

    // Get the month's name
    const month = months[currentMonth];
    $('#month').text(month);
}

// Initialize and update every second
updateClock();
setInterval(updateClock, 1000);
