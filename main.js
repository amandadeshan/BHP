// script.js

document.addEventListener('DOMContentLoaded', function() {
    updateUserList(); // Populate user list on page load
});

function updateUserList() {
    const department = document.getElementById('department').value;
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the existing user list

    const users = getUsersByDepartment(department);

    users.forEach(user => {
        const userBox = document.createElement('div');
        userBox.className = 'user-box';
        userBox.textContent = user;
        userBox.dataset.user = user;
        userBox.onclick = () => showTable(userBox);
        userList.appendChild(userBox);
    });
}

function getUsersByDepartment(department) {
    // Replace this with actual data fetching logic
    const allUsers = {
        BHP: ['Alice', 'Bob', 'Charlie'],
        HR: ['David', 'Eva', 'Frank'],
        Finance: ['Grace', 'Henry', 'Ivy'],
        Sales: ['Jack', 'Kara', 'Leo'],
        Marketing: ['Mona', 'Nina', 'Oscar']
    };
    return allUsers[department] || [];
}

function showTable(userBox) {
    const user = userBox.dataset.user;
    const tableBody = document.getElementById('tableBody');
    const month = document.getElementById('month').value;
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();

    tableBody.innerHTML = '';

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        const formattedDate = date.toISOString().split('T')[0];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${dayOfWeek}</td>
            <td><input type="text" class="time-input in-time" placeholder="e.g., 08:00 PM" /></td>
            <td><input type="text" class="time-input out-time" placeholder="e.g., 05:00 PM" /></td>
            <td class="ot-hours">0</td>
        `;
        tableBody.appendChild(row);
    }

    document.getElementById('tableHeader').innerText = `OT Calculation for ${user}`;
    document.getElementById('selectedUser').innerText = `Selected User: ${user}`;
    document.getElementById('userTable').style.display = 'block';

    initializeTimeInputs();
}

function initializeTimeInputs() {
    const inTimes = document.querySelectorAll('.in-time');
    const outTimes = document.querySelectorAll('.out-time');

    inTimes.forEach(input => {
        input.addEventListener('change', calculateOT);
    });

    outTimes.forEach(input => {
        input.addEventListener('change', calculateOT);
    });
}

function calculateOT() {
    const rows = document.querySelectorAll('#tableBody tr');

    rows.forEach(row => {
        const inTime = row.querySelector('.in-time').value;
        const outTime = row.querySelector('.out-time').value;

        if (inTime && outTime) {
            const inTimeDate = new Date(`1970-01-01T${inTime}`);
            const outTimeDate = new Date(`1970-01-01T${outTime}`);
            const diff = (outTimeDate - inTimeDate) / (1000 * 60 * 60);

            let otHours = 0;
            if (outTimeDate > new Date('1970-01-01T15:45:00')) {
                otHours = diff - 7.75;
            }

            row.querySelector('.ot-hours').textContent = otHours.toFixed(2);
        }
    });
}

function saveData() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function confirmSave() {
    closeModal();
    // Implement the save functionality here
}
