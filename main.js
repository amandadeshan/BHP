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
            <td><input type="text" class="time-input" placeholder="In"></td>
            <td><input type="text" class="time-input" placeholder="Out"></td>
            <td class="ot-hours">0</td>
        `;
        tableBody.appendChild(row);

        // Attach input event listeners for formatting
        row.querySelectorAll('.time-input').forEach(input => {
            input.addEventListener('input', formatTimeInput);
        });
    }
}

function formatTimeInput(event) {
    let value = event.target.value;

    // Remove any non-numeric characters (except colon)
    value = value.replace(/[^0-9:]/g, '');

    // Format the time string
    let [hours, minutes] = value.split(':');
    hours = hours ? hours.padStart(2, '0') : '00';
    minutes = minutes ? minutes.padEnd(2, '0') : '00';

    let period = 'AM';
    if (parseInt(hours) >= 12) {
        period = 'PM';
        if (parseInt(hours) > 12) {
            hours = (parseInt(hours) - 12).toString().padStart(2, '0');
        }
    }

    if (hours === '00') {
        hours = '12';
    }

    event.target.value = `${hours}:${minutes} ${period}`;
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
