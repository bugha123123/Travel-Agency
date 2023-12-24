// Function to fetch data and populate dropdowns
function fetchDataAndPopulateDropdowns(e) {
    e.preventDefault();

    fetch('http://localhost:5161/api/Flights', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Populate "From" dropdown
        populateDropdown('fromDropdown', data.map(flight => flight.from));

        // Populate "To" dropdown
        populateDropdown('toDropdown', data.map(flight => flight.to));

        // Populate "Time" dropdown
        populateDropdown('timeDropdown', data.map(flight => flight.time));

        // Re-populate booked flights list from local storage
        displayBookedFlights();
    })
    .catch(error => {
        console.error('Error fetching flight information:', error);
    });
}

// Function to populate a dropdown with options
function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    // Remove existing options
    dropdown.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select an option';
    dropdown.appendChild(defaultOption);

    // Add options from the data
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        dropdown.appendChild(optionElement);
    });
}

// Function to check if a flight is already booked
function isFlightAlreadyBooked(from, to, time) {
    const bookedFlights = getBookedFlights();
    return bookedFlights.some(flight => flight.from === from && flight.to === to && flight.time === time);
}

// Function to get the list of booked flights from local storage
function getBookedFlights() {
    const bookedFlightsStr = localStorage.getItem('bookedFlights');
    return bookedFlightsStr ? JSON.parse(bookedFlightsStr) : [];
}

// Function to add a booked flight to the list of booked flights in local storage
function addBookedFlight(from, to, time) {
    const bookedFlights = getBookedFlights();
    bookedFlights.push({ from, to, time });
    localStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
}

// Function to display booked flights from local storage
function displayBookedFlights() {
    const bookedFlightsList = document.getElementById('bookedFlightsList');
    const bookedFlights = getBookedFlights();

    // Clear existing content
    bookedFlightsList.innerHTML = '';

    // Display booked flights dynamically
    bookedFlights.forEach((flight) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `Flight  From ${flight.from} to ${flight.to} - Time: ${flight.time}`;
        bookedFlightsList.appendChild(listItem);
    });
}

// Call the function to fetch data and populate dropdowns when the page loads
document.addEventListener('DOMContentLoaded', fetchDataAndPopulateDropdowns);

// Event listener for form submission
document.getElementById('flightBookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fromDropdown = document.getElementById('fromDropdown');
    const toDropdown = document.getElementById('toDropdown');
    const time = document.getElementById('timeDropdown').value.trim();

    // Check if "From" and "To" are the same
    if (fromDropdown.value === toDropdown.value) {
        alert('Please select different "From" and "To" locations.');
        // Set background color to red for both "From" and "To" dropdowns
        fromDropdown.style.backgroundColor = 'red';
        toDropdown.style.backgroundColor = 'red';

        // Remove red background color after 3 seconds
        setTimeout(() => {
            fromDropdown.style.backgroundColor = '';
            toDropdown.style.backgroundColor = '';
        }, 3000);

        return;
    }

    if (!fromDropdown.value || !toDropdown.value || !time) {
        alert('Please fill in all the required fields.');
        return;
    }
    if (localStorage.getItem('UserName')) {
        // Check if the flight is already booked
        if (isFlightAlreadyBooked(fromDropdown.value, toDropdown.value, time)) {
            alert('You have already booked this flight.');
        } else {
            // Display success message
            alert(`Flight booked successfully!\nFrom: ${fromDropdown.value}\nTo: ${toDropdown.value}\nTime: ${time}`);

            // Display booked flights dynamically
            const bookedFlightsList = document.getElementById('bookedFlightsList');
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `Flight  From ${fromDropdown.value} to ${toDropdown.value} - Time: ${time}`;
            bookedFlightsList.appendChild(listItem);

            // Add the booked flight to the list of booked flights
            addBookedFlight(fromDropdown.value, toDropdown.value, time);
        }
    } else {
        alert('LOG IN FIRST');
    }
});

// Event listener for logout button
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
    // Clear user name from local storage and display
    window.localStorage.removeItem("UserName");
  
    // Clear booked flights list
    const bookedFlightsList = document.getElementById('bookedFlightsList');
    bookedFlightsList.innerHTML = '';

    // Clear booked flights data from local storage
    localStorage.removeItem('bookedFlights');
});


if (localStorage.getItem("UserName")) {
 document.querySelector(".googleicon").style.display = "block"
   document.querySelector(".signinbutton").style.display = "none"
   document.querySelector(".signupbutton").style.display = "none"
   document.querySelector(".divider").style.display = "none"
   document.querySelector(".Options").style.display = "none"
   document.querySelector(".ProfileCardOpen").style.display = "block"
   logoutButton.style.display = "block"
}else{
  
  
    document.querySelector(".googleicon").style.display = "none"
    document.querySelector(".signinbutton").style.display = "block"
    document.querySelector(".signupbutton").style.display = "block"
    document.querySelector(".divider").style.display = "none"
    document.querySelector(".Options").style.display = "block"
    document.querySelector(".ProfileCardOpen").style.display = "none"
    logoutButton.style.display = "none"
}
