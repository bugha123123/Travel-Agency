document.getElementById('flightBookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Fetch flight information based on user input
    fetch('http://localhost:5161/api/Flights', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Get user input values
        const from = document.getElementById('fromInput').value.trim();
        const to = document.getElementById('toInput').value.trim();
        const time = document.getElementById('timeInput').value.trim();
if (localStorage.getItem("UserName")) {
    

        // Check if the flight is already booked
        if (isFlightAlreadyBooked(from, to, time)) {
            alert('You have already booked this flight.');
        } else {
            // Filter flights based on user input
            const filteredFlights = data.filter(flight => {
                return flight.from === from && flight.to === to && flight.time === time;
            });

            // Display booked flights dynamically
            const bookedFlightsList = document.getElementById('bookedFlightsList');
            let displayIndex = 1; // Counter for display

            if (filteredFlights.length > 0) {
                filteredFlights.forEach((flight) => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.textContent = `Flight  From ${flight.from} to ${flight.to} - Time: ${flight.time}`;
                    bookedFlightsList.appendChild(listItem);

                    // Add the booked flight to the list of booked flights
                    addBookedFlight(from, to, time);

                    displayIndex++; // Increment display index
                });
            } else {
                // Update input background color to red
                document.getElementById('fromInput').style.backgroundColor = '#FFCCCC';
                document.getElementById('toInput').style.backgroundColor = '#FFCCCC';
                document.getElementById('timeInput').style.backgroundColor = '#FFCCCC';

                // Reset background color after 2 seconds
                setTimeout(() => {
                    document.getElementById('fromInput').style.backgroundColor = '';
                    document.getElementById('toInput').style.backgroundColor = '';
                    document.getElementById('timeInput').style.backgroundColor = '';
                }, 2000);
            }
        }}else{
            alert("LOG IN FIRST")
        }
    })
    .catch(error => {
        console.error('Error fetching flight information:', error);
    });
});

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