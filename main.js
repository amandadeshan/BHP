// main.js

const users = {
    BHP: ['K.P.I. Malkanthi', 'W.D.R.C.Wijesiri', 'A.M.R.T.Atapaththu', 'N.M.R.Abeynayaka', 'J.M.C.N.Jayasunara', 'K.M.Nihal', 'M.R.Ansifa', 'W.M.S.R.Rajapaksha', 'M.J.J.Mohomed', 'A.C.Naushad', 'V.L.Sampath', 'R.D.B.Sarathchandra'],
    MLT: ['T.M.A.G.Manoj', 'N.M.K.K.Lokuwela', 'T.K.D.Suresh', 'S.J.P.Yapa', 'K.K.Rathnayaka', 'R.G.D.L.L.Malinda', 'W.W.A.R.Wijesinghe', 'D.K.J.Indika', 'A.A.G.M.U.Serasinghe', 'H.G.W.Karunathilaka'],
    HR: ['R.A.D. Perera', 'S.M.P. Rajapaksha', 'P.T.K. Wijeratne', 'G.L. Perera', 'N.D. Jayawardena'],
    IT: ['A.L.K. Silva', 'J.P.A. Jayasinghe', 'R.S.A. Fernando', 'K.W. Dissanayake', 'H.M. Kothalawala'],
    Finance: ['S.D. Kumarasinghe', 'N.P. Gamage', 'A.C. Fernando', 'R.D. Silva', 'M.J. Abeysinghe']
};

let calculateOT;

function loadDepartmentScript(department) {
    const script = document.createElement('script');
    script.src = `${department}.js`;
    script.onload = () => {
        if (window[`calculate${department}OT`]) {
            calculateOT = window[`calculate${department}OT`];
        }
    };
    document.body.appendChild(script);
}

function showUsers() {
    const department = document.getElementById('department').value;
    const userList = document.getElementById('userList');

    userList.innerHTML = '';
    if (users[department]) {
        users[department].forEach(user => {
            const userBox = document.createElement('div');
            userBox.className = 'user-box';
            userBox.textContent = user;
            userBox.onclick = () => selectUser(user);
            userBox.dataset.user = user;
            userList.appendChild(userBox);
        });

        loadDepartmentScript(department);
    }
}

function selectUser(user) {
    const table = document.getElementById('userTable');
    table.style.display = 'block';

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (let day = 1; day <= 31; day++) {
        const date = new Date(2024, document.getElementById('month').value - 1, day);
        if (date.getMonth() !== document.getElementById('month').value - 1) continue; // Skip invalid days

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date.toISOString().split('T')[0]}</td>
            <td>${date.toLocaleDateString('en-US', { weekday: 'long' })}</td>
            <td><input type="time" class="in-time" /></td>
            <td><input type="time" class="out-time" /></td>
            <td class="ot-hours">0</td>
        `;
        tableBody.appendChild(row);
    }

    currentUserBox = document.querySelector(`.user-box[data-user="${user}"]`);
    currentUserData = { month: document.getElementById('month').value, department: document.getElementById('department').value, user: user };
}

function saveUserData(user) {
    const month = document.getElementById('month').value;
    const department = document.getElementById('department').value;
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData[month] = userData[month] || {};
    userData[month][department] = userData[month][department] || {};
    userData[month][department][user] = currentUserData;

    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach(row => {
        const inTime = row.querySelector('.in-time').value;
        const outTime = row.querySelector('.out-time').value;
        const otCell = row.querySelector('.ot-hours');

        if (inTime && outTime) {
            const date = new Date(row.cells[0].textContent);
            const day = date.getDay();
            const otHours = calculateOT(inTime, outTime, day);
            otCell.textContent = otHours.toFixed(2);
        }
    });

    localStorage.setItem('userData', JSON.stringify(userData));
}

function saveUser() {
    if (currentUserData.user) {
        saveUserData(currentUserData.user);
    }
}

function goBack() {
    document.getElementById('userTable').style.display = 'none';
    document.getElementById('userList').innerHTML = '';
    currentUserBox = null;
    currentUserData = {};
}

function completeUser() {
    if (currentUserBox) {
        currentUserBox.classList.add('completed');
        saveUser();
    }
}

function openAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'flex';
}

function closeAddRemoveModal() {
    document.getElementById('addRemoveModal').style.display = 'none';
}

function addUser() {
    // Add user logic here
}

function removeUser() {
    // Remove user logic here
}
