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
    // Update user list based on selected month and department
    console.log('Update user list');
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
