function updateClock() {
    const now = new Date();
    let hours = now.getHours(); // Get hours in 24-hour format
    const minutes = now.getMinutes(); // Get minutes
    const isPM = hours >= 12;

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 -> 12)

    // Format minutes with leading zero
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    // Format the clock string
    const timeString = hours + ':' + minutesStr);
    document.getElementById('clock').innerText = timeString;

    // Get the current month (zero-indexed, so +1 to match calendar months)
    const currentMonth = now.getMonth(); // Returns values 0-11

    // Map the months to their Georgian equivalents
    const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი',
        'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო',
        'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];

    const month = months[currentMonth] || 'უცნობი'; // Default to 'უცნობი' if something goes wrong
    document.getElementById('month').innerText = month;
}

// Call the function once immediately to set initial values
updateClock();

// Update every second
setInterval(updateClock, 1000);
