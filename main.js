document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    populateMonthSelect();
    populateYearSelect();
    populateDepartmentSelect();
    updateUserList(); // Initialize with default selections
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
    console.log('Month select populated');
}

function populateYearSelect() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    console.log('Year select populated');
}

function populateDepartmentSelect() {
    const departmentSelect = document.getElementById('department');
    const departments = ["OFFICE/DO", "MO"];
    departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        departmentSelect.appendChild(option);
    });
    departmentSelect.addEventListener('change', () => {
        console.log('Department changed to:', departmentSelect.value);
        updateUserList();
    });
    console.log('Department select populated');
}

function openAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'block';
    populateAddRemoveUserList();
}

function closeAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'none';
}

function populateAddRemoveUserList() {
    const department = document.getElementById('department').value;
    console.log('Populating add/remove user list for department:', department);
    const users = usersByDepartment[department] || [];
    const userList = document.getElementById('addRemoveUserList');
    userList.innerHTML = ''; // Clear previous content

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-box';
        userDiv.textContent = user;
        userDiv.onclick = () => selectUser(user);
        userList.appendChild(userDiv);
    });
}

function selectUser(user) {
    console.log(`Selected user: ${user}`);
}

function addUser() {
    console.log('Add user clicked');
}

function removeUser() {
    console.log('Remove user clicked');
}

function updateUserList() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const department = document.getElementById('department').value;
    console.log('Updating user list for', { month, year, department });

    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear existing user list

    const users = usersByDepartment[department] || [];
    console.log("Users:", users);

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-box';
        userDiv.textContent = user;
        userDiv.onclick = () => showUserTable(user, month, year);
        userList.appendChild(userDiv);
    });
}

function showUserTable(user, month, year) {
    console.log(`Showing table for user: ${user}, Month: ${month}, Year: ${year}`);
    const selectedUser = document.getElementById('selectedUser');
    selectedUser.textContent = `User: ${user}`;

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing table rows

    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${day}</td>
            <td>${dayName}</td>
            <td><input type="time" class="time-input" placeholder="Enter In"></td>
            <td><input type="time" class="time-input" placeholder="Enter Out"></td>
            <td><input type="text" class="time-input" readonly></td>
        `;
        tableBody.appendChild(row);
    }

    document.getElementById('userTable').style.display = 'block';
}

function goBack() {
    document.getElementById('userTable').style.display = 'none';
}

function saveData() {
    console.log('Save data clicked');
}

function completeUser() {
    console.log('Complete user clicked');
}

function applyFastEntry() {
    const fastIn = document.getElementById('fastIn').value;
    const fastOut = document.getElementById('fastOut').value;

    if (fastIn && fastOut) {
        const timeInputs = document.querySelectorAll('#tableBody .time-input');
        timeInputs.forEach((input, index) => {
            if (index % 3 === 0) input.value = fastIn; // Set In Time
            else if (index % 3 === 1) input.value = fastOut; // Set Out Time
        });
    } else {
        alert('Please select both In and Out times.');
    }
}
