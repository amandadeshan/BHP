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

    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    monthSelect.value = new Date().getMonth() + 1; // Set current month as default
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

function showTable(user) {
    document.getElementById('selectedUser').textContent = `Selected User: ${user.textContent}`;
    document.getElementById('userTable').style.display = 'block';
    generateTable(user.textContent);
}

function generateTable(user) {
    const monthSelect = document.getElementById('month');
    const month = monthSelect.value;
    const year = new Date().getFullYear();

    const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
    const firstDay = new Date(year, month - 1, 1).getDay(); // Get the day of the week for the 1st of the month

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Create empty cells for days before the start of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('tr');
        emptyCell.innerHTML = `<td></td><td></td><td></td><td></td><td></td>`;
        tableBody.appendChild(emptyCell);
    }

    // Create cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${day}</td>
            <td>${dayName}</td>
            <td><input type="text" class="time-input" placeholder="In Time"></td>
            <td><input type="text" class="time-input" placeholder="Out Time"></td>
            <td>0</td>
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
