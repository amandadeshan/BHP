function generateTable(user) {
    const monthSelect = document.getElementById('month');
    const month = parseInt(monthSelect.value, 10);
    const year = new Date().getFullYear();

    // Clear the previous table content
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Create a table header with column names
    const table = document.createElement('table');
    table.className = 'professional-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Day</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>OT Hours</th>
            </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    `;
    
    // Append the table to the tableBody element
    tableBody.appendChild(table);

    // Get the number of days in the selected month
    const daysInMonth = new Date(year, month, 0).getDate();
    // Get the day of the week for the 1st of the month
    const firstDay = new Date(year, month - 1, 1).getDay();

    // Create rows for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${day}</td>
            <td>${dayName}</td>
            <td><input type="text" class="time-input" placeholder="In Time"></td>
            <td><input type="text" class="time-input" placeholder="Out Time"></td>
            <td class="ot-hours">0</td>
        `;
        tableBody.appendChild(row);
    }
}
