document.addEventListener('DOMContentLoaded', () => {
    populateMonthSelect();
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

function populateDepartmentSelect() {
    // Future implementation if you need to populate departments dynamically
}

function openAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'block';
    populateAddRemoveUserList();
}

function closeAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'none';
}

function populateAddRemoveUserList() {
    // Example list of users
    const users = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis"];
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
    const department = document.getElementById('department').value;
    const userList = document.getElementById('userList');

    // Clear existing user list
    userList.innerHTML = '';

    // Example user data - this should be replaced with actual data fetching logic
    const users = [
        { name: "John Doe", department: "HR" },
        { name: "Jane Smith", department: "Finance" },
        { name: "Robert Johnson", department: "Sales" },
        { name: "Emily Davis", department: "Marketing" }
    ];

    // Filter users based on selected department
    const filteredUsers = users.filter(user => user.department === department);

    filteredUsers.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-box';
        userDiv.textContent = user.name;
        userDiv.onclick = () => showUserTable(user);
        userList.appendChild(userDiv);
    });
}

function showUserTable(user) {
    document.getElementById('selectedUser').textContent = `User: ${user.name}`;
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
document.getElementById('department').addEventListener('change', updateUserList);
