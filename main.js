// Example user data categorized by department
const usersByDepartment = {
    "HR": ["K.P.I.Malkanthi", "W.D.R.C.Wijesiri", "A.M.R.T.Atapaththu", "N.M.R.Abeynayaka", "J.M.C.N.Jayasundara", "K.M.Nihal", "M.R.Ansifa", "W.M.S.R.Rajapaksha", "M.J.J.Mohomed", "A.C.Naushad", "V.L.S.De Mel", "H.M.I.D.Herath", "H.P.U.Manjula", "M.F.M.Fasarath", "L.I.Chandrasekera", "J.D.Jegadhalini", "H.P.D.P.N.Gunathilaka", "S.M.Sacky", "R.R.Shareef", "D.M.M.Diwakara", "H.M.P.Herath", "A.M.Arshath"],
    "Finance": ["Jane Smith", "Bob Johnson"],
    "Sales": ["Robert Johnson", "Emily Davis"],
    "Marketing": ["Jessica Lee", "Michael White"]
};

document.addEventListener('DOMContentLoaded', () => {
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
}

function populateDepartmentSelect() {
    const departmentSelect = document.getElementById('department');
    Object.keys(usersByDepartment).forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        departmentSelect.appendChild(option);
    });
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
    // Handle user selection
    console.log(`Selected user: ${user}`);
}

function addUser() {
    // Add user logic
    console.log('Add user');
}

function removeUser() {
    // Remove user logic
    console.log('Remove user');
}

function updateUserList() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const department = document.getElementById('department').value;
    const userList = document.getElementById('userList');

    // Clear existing user list
    userList.innerHTML = '';

    // Get users for the selected department
    const users = usersByDepartment[department] || [];

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-box';
        userDiv.textContent = user;
        userDiv.onclick = () => showUserTable(user, month, year);
        userList.appendChild(userDiv);
    });
}

function showUserTable(user, month, year) {
    const selectedUser = document.getElementById('selectedUser');
    selectedUser.textContent = `User: ${user}`;

    // Generate dates for the selected month and year
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing table rows

    const daysInMonth = new Date(year, month, 0).getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${day}</td>
            <td>${dayName}</td>
            <td><input type="text" class="time-input"></td>
            <td><input type="text" class="time-input"></td>
            <td><input type="text" class="time-input"></td>
        `;

        tableBody.appendChild(row);
    }

    document.getElementById('userList').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('userTable').style.display = 'block';
}

function saveData() {
    // Save data logic
    console.log('Data saved');
}

function completeUser() {
    // Complete user data logic
    console.log('User data completed');
}

function goBack() {
    document.getElementById('userTable').style.display = 'none';
    document.querySelector('.controls').style.display = 'block';
    document.querySelector('.user-list').style.display = 'flex';
}

// Add event listeners for selection changes
document.getElementById('month').addEventListener('change', updateUserList);
document.getElementById('year').addEventListener('change', updateUserList);
document.getElementById('department').addEventListener('change', updateUserList);
