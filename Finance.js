// Function to calculate OT for Finance department
function calculateOT(inTime, outTime) {
    // Parse the input times to numbers
    const inHours = parseFloat(inTime);
    const outHours = parseFloat(outTime);

    // Ensure valid input
    if (isNaN(inHours) || isNaN(outHours) || inHours >= outHours) {
        return 0;
    }

    // Calculate OT
    return (outHours - inHours) * 3; // OT formula
}

// Function to apply the OT calculation to all rows in the Finance table
function applyFinanceOTCalculation() {
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const inInput = row.querySelector('td:nth-child(3) input').value;
        const outInput = row.querySelector('td:nth-child(4) input').value;
        const otInput = row.querySelector('td:nth-child(5) input');

        // Calculate OT and update the OT input field
        const ot = calculateOT(inInput, outInput);
        otInput.value = ot.toFixed(2); // Display OT with 2 decimal places
    });
}
