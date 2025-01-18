const users = {
    aman: "aman@123",
};

const mon = document.getElementById('curmon')

let bookings = JSON.parse(localStorage.getItem("bookings")) || {};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
mon.innerText = `Calander - ${getMonthName(0)}, ${currentYear}`

const calendarElements = {
    calendarView: document.getElementById('calendar-view'),
    loginForm: document.getElementById('login-form'),
    calendar: document.getElementById('calendar'),
    slots: document.getElementById('slots'),
    errorElem: document.getElementById('login-error'),
    usernameField: document.getElementById('username'),
    passwordField: document.getElementById('password'),
    alertContainer: document.getElementById('alert-container'),
    calendarNav: document.getElementById('calendar-nav')
};

document.getElementById('form').addEventListener('submit', login);

function login(e) {
    e.preventDefault();
    const username = calendarElements.usernameField.value;
    const password = calendarElements.passwordField.value;

    if (isValidUser(username, password)) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        showCalendar();
    } else {
        calendarElements.errorElem.textContent = "Invalid username or password.";
    }
}

function isValidUser(username, password) {
    return users[username] && users[username] === password;
}

function showCalendar() {
    calendarElements.loginForm.style.display = 'none';
    calendarElements.calendarView.style.display = 'block';

    // Create the navigation buttons
    createNavigationButtons();

    renderCalendar();
}

function createNavigationButtons() {
    calendarElements.calendarNav.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous Month';
    prevButton.classList.add('btn', 'btn-primary');
    prevButton.addEventListener('click', () => changeMonth(-1));

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Month';
    nextButton.classList.add('btn', 'btn-primary', 'mx-1');
    nextButton.addEventListener('click', () => changeMonth(1));

    calendarElements.calendarNav.appendChild(prevButton);
    calendarElements.calendarNav.appendChild(nextButton);
}

function renderCalendar() {
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let calendarHTML = createCalendarTable(firstDay, daysInMonth);
    calendarElements.calendar.innerHTML = calendarHTML;
}

function createCalendarTable(firstDay, daysInMonth) {
    let calendarHTML = "<table><tr>";
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    weekdays.forEach(day => {
        calendarHTML += `<th>${day}</th>`;
    });

    calendarHTML += "</tr><tr>";
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += "<td></td>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
            calendarHTML += "</tr><tr>";
        }
        calendarHTML += `<td onclick="selectDate(${day})">${day}</td>`;
    }

    calendarHTML += "</tr></table>";
    return calendarHTML;
}

function changeMonth(offset) {
    currentMonth += offset;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    mon.innerText = `Calander - ${getMonthName(currentMonth)}, ${currentYear}`
    renderCalendar();
}

function selectDate(day) {
    const selectedDate = new Date(currentYear, currentMonth, day);
    displayAvailableSlots(selectedDate);
}

function displayAvailableSlots(date) {
    const formattedDate = date.toDateString();
    const availableSlots = getAvailableSlots(formattedDate);

    let slotHTML = `<h3>Available Slots for ${formattedDate}</h3>`;
    availableSlots.forEach(slot => {
        slotHTML += `<button onclick="bookSlot('${formattedDate}', '${slot}')">${slot}</button><br>`;
    });

    calendarElements.slots.innerHTML = slotHTML;
}

function getAvailableSlots(formattedDate) {
    const availableSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];
    const bookedSlots = bookings[formattedDate] || [];

    return availableSlots.filter(slot => !bookedSlots.includes(slot));
}

function bookSlot(date, slot) {
    if (!bookings[date]) {
        bookings[date] = [];
    }
    bookings[date].push(slot);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Show notification
    showBookingNotification(date, slot);

    displayAvailableSlots(new Date(date));
}

function showBookingNotification(date, slot) {
    const notificationHTML = `
        <div class="alert alert-warning alert-dismissible fade show fixed-top" role="alert">
            <strong>Success!</strong> You have successfully booked the ${slot} slot on ${date}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    calendarElements.alertContainer.innerHTML = notificationHTML;
    setTimeout(e => calendarElements.alertContainer.innerHTML = '', 1000);
}


function getMonthName(index) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth(); // 0-based month
    // const adjustedMonth = (currentMonth + offset + 12) % 12; // Ensure it stays within range
    return monthNames[index];
}