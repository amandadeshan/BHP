// IT.js

function calculateITOT(inTime, outTime, day) {
    const regularEnd = new Date(`1970-01-01T17:00:00`);
    const overtimeEnd = new Date(`1970-01-01T19:00:00`);

    let overtimeHours = 0;

    if (day === 6 || day === 0 || isHoliday(new Date())) {
        const inDate = new Date(`1970-01-01T${inTime}`);
        const outDate = new Date(`1970-01-01T${outTime}`);
        
        if (inDate < regularEnd) {
            inDate.setTime(regularEnd.getTime());
        }
        if (outDate > overtimeEnd) {
            outDate.setTime(overtimeEnd.getTime());
        }

        if (inDate < outDate) {
            overtimeHours = (outDate - inDate) / (1000 * 60 * 60);
        }
    }

    return overtimeHours;
}

function isHoliday(date) {
    // Placeholder for actual holiday logic
    return false;
}
