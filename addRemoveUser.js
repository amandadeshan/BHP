const users = {
    BHP: ['K.P.I. Malkanthi', 'W.D.R.C.Wijesiri', 'A.M.R.T.Atapaththu', 'N.M.R.Abeynayaka'],
    MLT: Array.from({ length: 30 }, (_, i) => `User${i + 1}`)
};

function openAddRemoveModal() {
    const modal = document.getElementById('addRemoveModal');
    const userList = document.getElementById('addRemoveUserList');
    const department = document.getElementById('department').value;
    
    userList.innerHTML = '';
    users[department].forEach(user => {
        const item = document.createElement('div');
        item.classList.add('user-list-item');
        item.innerHTML = `<input type="checkbox" id="${user}" /> <label for="${user}">${user}</label>`;
        userList.appendChild(item);
    });

    modal.style.display = 'flex';
}

function closeAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'none';
}

function addUser() {
    const department = document.getElementById('department').value;
    const checkboxes = document.querySelectorAll('#addRemoveUserList input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const user = checkbox.id;
        if (!users[department].includes(user)) {
            users[department].push(user);
        }
    });
    showUsers();
    closeAddRemoveModal();
}

function removeUser() {
    const department = document.getElementById('department').value;
    const checkboxes = document.querySelectorAll('#addRemoveUserList input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const user = checkbox.id;
        users[department] = users[department].filter(u => u !== user);
    });
    showUsers();
    closeAddRemoveModal();
}

function showUsers() {
    const department = document.getElementById('department').value;
    const userList = document.getElementById('userList');
    userList.innerHTML = users[department].map(user => `<div>${user}</div>`).join('');
}

function goBack() {
    // Logic for "Exit Table"
}

function saveUser() {
    // Logic for "Save"
}

function completeUser() {
    // Logic for "Complete"
}
