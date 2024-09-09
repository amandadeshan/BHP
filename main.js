const usersByDepartment = {
    "OFFICE/DO": ["User1", "User2"],
    "MO": ["User3"]
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

    monthSelect.addEventListener('change', updateUserList);
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

    yearSelect.addEventListener('change', updateUserList);
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

    departmentSelect.addEventListener('change', updateUserList);
}

function updateUserList() {
    console.log('updateUserList called');
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const department = document.getElementById('department').value;
    const userList = document.getElementById('userList');

    userList.innerHTML = ''; // Clear existing user list

    console.log(`Month: ${month}, Year: ${year}, Department: ${department}`);

    if (department && month && year) {
        const users = usersByDepartment[department] || [];
        console.log(`Users for ${department}: ${users}`);
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-box';
            userDiv.textContent = user;
            userDiv.onclick = () => showUserTable(user, month, year);
            userList.appendChild(userDiv);
        });
    } else {
        console.log('Please select a month, year, and department');
    }
}

function showUserTable(user, month, year) {
    console.log(`showUserTable called for user: ${user}, month: ${month}, year: ${year}`);
    const selectedUser = document.getElementById('selectedUser');
    selectedUser.textContent = `User: ${user}`;

    // Generate dates for the selected month and year
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
