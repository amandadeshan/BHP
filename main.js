<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OT Calculation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e3f2fd;
        }

        h1 {
            text-align: center;
        }

        .container {
            width: 80%;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            margin-right: 10px;
            font-weight: bold;
        }

        .form-group select, .form-group button {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        .form-group button {
            background-color: #2196f3;
            color: white;
            cursor: pointer;
        }

        .form-group button:hover {
            background-color: #1e88e5;
        }

        #userButtons button {
            margin: 5px;
            padding: 10px;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #userButtons button:hover {
            background-color: #1e88e5;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table, th, td {
            border: 1px solid #2196f3;
        }

        th, td {
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #2196f3;
            color: white;
        }

        .button-group {
            text-align: center;
            margin-top: 20px;
        }

        .button-group button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            background-color: #2196f3;
            color: white;
            cursor: pointer;
        }

        .button-group button:hover {
            background-color: #1e88e5;
        }

        /* Initially hide the table */
        #otTableSection {
            display: none;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>OT Calculation</h1>
        <div class="form-group">
            <label for="month">Select Month:</label>
            <select id="month">
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>

            <label for="department">Select Department:</label>
            <select id="department">
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="BHP">BHP</option>
            </select>

            <button id="addRemoveBtn">Add/Remove</button>
        </div>

        <div id="userButtons">
            <button onclick="showTable()">Alice</button>
            <button onclick="showTable()">Bob</button>
            <button onclick="showTable()">Charlie</button>
        </div>

        <!-- Table section wrapped inside a div -->
        <div id="otTableSection">
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
                <tbody>
                    <!-- Table rows will be dynamically inserted here -->
                </tbody>
            </table>

            <div class="button-group">
                <button>Exit Table</button>
                <button>Save</button>
                <button>Completed</button>
            </div>
        </div>
    </div>

    <script>
        // Function to show the table
        function showTable() {
            var tableSection = document.getElementById('otTableSection');
            tableSection.style.display = 'block'; // Show the table
        }
    </script>

</body>
</html>
