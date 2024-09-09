<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OT Calculation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="background"></div>
    <div class="container">
        <header>
            <h1>OT Calculation</h1>
        </header>
        <div class="controls">
            <label for="month">Select Month:</label>
            <select id="month">
                <!-- Options will be populated by JavaScript -->
            </select>

            <label for="year">Select Year:</label>
            <select id="year">
                <!-- Options will be populated by JavaScript -->
            </select>

            <label for="department">Select Department:</label>
            <select id="department">
                <!-- Options will be populated by JavaScript -->
            </select>
            <button id="addRemoveBtn" onclick="openAddRemoveModal()">Add/Remove</button>
        </div>

        <div id="userList" class="user-list"></div>

        <div id="userTable" class="table-container" style="display: none;">
            <div id="selectedUser" class="table-header"></div>
            
            <!-- Fast Entry Section -->
            <div class="fast-entry">
                <label for="fastIn">Fast Entry - In Time:</label>
                <input type="time" id="fastIn" placeholder="Select In Time">
                <label for="fastOut">Fast Entry - Out Time:</label>
                <input type="time" id="fastOut" placeholder="Select Out Time">
                <button onclick="applyFastEntry()">Apply to All Rows</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>In</th>
                        <th>Out</th>
                        <th>OT</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
            <div class="table-footer">
                <button onclick="goBack()">Exit Table</button>
                <button onclick="saveData()">Save</button>
                <button onclick="completeUser()">Completed</button>
            </div>
        </div>

        <!-- Modal -->
        <div id="addRemoveModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onclick="closeAddRemoveModal()">&times;</span>
                    <h2>Add/Remove Users</h2>
                </div>
                <div class="modal-body">
                    <div id="addRemoveUserList"></div>
                </div>
                <div class="modal-footer">
                    <button onclick="addUser()">Add</button>
                    <button onclick="removeUser()">Remove</button>
                    <button onclick="closeAddRemoveModal()">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="main.js"></script>
    <script src="office-do.js"></script>
    <script src="mo.js"></script>
</body>
</html>
