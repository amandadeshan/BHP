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

    // Clear existing options
    monthSelect.innerHTML = '';

    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

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

    // Clear the previous table content
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Get the table element and thead
    const table = document.querySelector('#userTable table');
    let thead = table.querySelector('thead');

    if (!thead) {
        // Create thead if it doesn't exist
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
        // Create header row if it doesn't exist
        const newHeaderRow = thead.insertRow();
        newHeaderRow.innerHTML = `
            <th>Date</th>
            <th>Day</th>
            <th>In</th>
            <th>Out</th>
            <th>OT</th>
        `;
    }

    // Get the number of days in the selected month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Create rows for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day); // Correct month index
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
