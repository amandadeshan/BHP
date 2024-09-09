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
            <td><input type="text" class="time-input" placeholder="In" maxlength="5"></td>
            <td><input type="text" class="time-input" placeholder="Out" maxlength="5"></td>
            <td class="ot-hours">0</td>
        `;
        tableBody.appendChild(row);

        row.querySelectorAll('.time-input').forEach(input => {
            input.addEventListener('input', formatTimeInput);
        });
    }
}

function formatTimeInput(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 4) {
        value = value.slice(0, 4); // Limit to 4 digits
    }

    if (value.length <= 2) {
        value = value.padStart(2, '0'); // Ensure at least 2 digits
        input.value = `${value}:00 AM`;
    } else {
        const hours = parseInt(value.slice(0, -2), 10);
        const minutes = value.slice(-2);
        const period = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
        input.value = `${formattedHours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')} ${period}`;
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
