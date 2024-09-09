document.addEventListener('DOMContentLoaded', () => {
    populateMonthSelect();
    updateUserList();
});

function populateMonthSelect() {
    const monthSelect = document.getElementById('month');
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    monthSelect.innerHTML = months.map((month, index) => 
        `<option value="${index + 1}">${month}</option>`
    ).join('');

    monthSelect.value = new Date().getMonth() + 1; // Set current month as default
    monthSelect.addEventListener('change', updateUserList);
}

function updateUserList() {
    const department = document.getElementById('department').value;
    const users = getUsersByDepartment(department);
    const userList = document.getElementById('userList');

    userList.innerHTML = '';

    users.forEach(user => {
        const userBox = document.createElement('div');
        userBox.className = 'user-box';
        userBox.dataset.user = user;
        userBox.innerText = user;
        userBox.onclick = () => showTable(userBox);
        userList.appendChild(userBox);
    });
}

function getUsersByDepartment(department) {
    const allUsers = {
        BHP: ['Alice', 'Bob', 'Charlie'],
        HR: ['David', 'Eve', 'Frank'],
        Finance: ['Grace', 'Hank', 'Ivy'],
        Sales: ['Jack', 'Kara', 'Liam'],
        Marketing: ['Mona', 'Nina', 'Oscar']
    };
    return allUsers[department] || [];
}

function showTable(userBox) {
    document.getElementById('selectedUser').textContent = `Selected User: ${userBox.textContent}`;
    document.getElementById('userTable').style.display = 'block';
    generateTable(userBox.textContent);
}

function generateTable(user) {
    const monthSelect = document.getElementById('month');
    const month = parseInt(monthSelect.value, 10);
    const year = new Date().getFullYear();

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const table = document.querySelector('#userTable table');
    let thead = table.querySelector('thead');

    if (!thead) {
        thead = table.createTHead();
    }
    
    const headerRow = thead.querySelector('tr');
    if (headerRow) {
        headerRow.innerHTML = `
            <th>Date</th>
            <th>Day</th>
            <th>In</th>
            <th>Out</th>
            <th>OT</th>
        `;
    } else {
        const newHeaderRow = thead.insertRow();
        newHeaderRow.innerHTML = `
            <th>Date</th>
            <th>Day</th>
            <th>In</th>
            <th>Out</th>
            <th>OT</th>
        `;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${day}</td>
            <td>${dayName}</td>
            <td><input type="text" class="time-input" placeholder="In" maxlength="7"></td>
            <td><input type="text" class="time-input" placeholder="Out" maxlength="7"></td>
            <td class="ot-hours">0</td>
        `;
        tableBody.appendChild(row);

        row.querySelectorAll('.time-input').forEach(input => {
            input.addEventListener('input', formatTimeInput);
        });
    }
}

function formatTimeInput(event) {
    let value = event.target.value.toUpperCase().replace(/[^0-9APM/]/g, ''); // Remove invalid characters
    let hours, minutes, period = 'AM';

    // Split the input into parts
    let parts = value.split('/');
    if (parts.length >= 2) {
        hours = parts[0];
        minutes = parts[1];
        if (parts.length === 3 && (parts[2] === 'AM' || parts[2] === 'PM')) {
            period = parts[2];
        }

        // Adjust hours and minutes
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);

        if (isNaN(hours)) hours = 0;
        if (isNaN(minutes)) minutes = 0;
        if (minutes >= 60) minutes = 59; // Max minutes

        if (hours > 12) hours = 12; // Max hours in 12-hour format
        if (hours === 0) hours = 12; // Midnight is 12:00 AM

        // Format time
        event.target.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    } else {
        event.target.value = '';
    }
}

function saveData() {
    document.getElementById('modal').style.display = 'block';
}

function confirmSave() {
    closeModal();
    alert('Data saved!');
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function openAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'block';
}

function closeAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'none';
}

function addUser() {
    alert('Add User functionality');
}

function removeUser() {
    alert('Remove User functionality');
}

function goBack() {
    document.getElementById('userTable').style.display = 'none';
}
