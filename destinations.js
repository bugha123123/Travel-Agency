document.addEventListener('DOMContentLoaded', async function () {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', async function () {
        const cityInput = document.getElementById('cityInput').value.trim();
        if (cityInput !== '') {
            const newCityResults = await fetchAndStoreResults(cityInput);
            displayResults(newCityResults);
        }
    });

    const logoutButton = document.querySelector(".logout");

    if (localStorage.getItem("UserName")) {
        setupLoggedInState();
    } else {
        setupLoggedOutState();
    }

    function setupLoggedInState() {
        document.querySelector(".googleicon").style.display = "block";
        document.querySelector(".signinbutton").style.display = "none";
        document.querySelector(".signupbutton").style.display = "none";
        document.querySelector(".divider").style.display = "none";
        document.querySelector(".Options").style.display = "none";
        document.querySelector(".ProfileCardOpen").style.display = "block";
        logoutButton.style.display = "block";
    }

    function setupLoggedOutState() {
        document.querySelector(".googleicon").style.display = "none";
        document.querySelector(".signinbutton").style.display = "block";
        document.querySelector(".signupbutton").style.display = "block";
        document.querySelector(".divider").style.display = "none";
        document.querySelector(".Options").style.display = "block";
        document.querySelector(".ProfileCardOpen").style.display = "none";
        logoutButton.style.display = "none";
    }

    async function fetchAndStoreResults(cityInput) {
        try {
            const response = await fetch(`https://api.teleport.org/api/cities/?search=${cityInput}`);
            const data = await response.json();

            const cityResults = data._embedded['city:search-results'].slice(0, 10); // Limit results to 10

            // Cache the data in local storage
            localStorage.setItem(cityInput, JSON.stringify(cityResults));

            return cityResults;
        } catch (error) {
            console.error('Error fetching city information:', error);
            return null; // Return null in case of error
        }
    }

    async function fetchWeather(cityName) {
        try {
            const apiKey = '4fe7ee53c8c7443741c49d4af2be1905';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            return data.main.temp; // Temperature in Celsius
        } catch (error) {
            console.error('Error fetching weather information:', error);
            return null; // Return null in case of error
        }
    }

  async  function displayResults(cityResults) {
        const cityInformationContainer = document.getElementById('cityInformation');
        cityInformationContainer.innerHTML = ''; // Clear previous results

        for (const city of cityResults) {
            const cityName = city.matching_full_name;

            // Fetch image URL
            const imageUrl = await fetchImage(cityName);

            // Fetch weather temperature
            const temperature = await fetchWeather(cityName);

            // Fetch weather icon
            const weatherIcon = getWeatherIcon(temperature);

            // Create a Bootstrap card for each city with image URL, city name, temperature, and weather icon
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            cardElement.innerHTML = `
                <img src="${imageUrl}" class="card-img-top" alt="Image Limit Exceeded Wait 1 HOUR">
                <div class="card-body">
                    <h5 class="card-title">${cityName}</h5>
                    <p class="card-text">${temperature} °C ${weatherIcon}</p>
                </div>
            `;

            cityInformationContainer.appendChild(cardElement);
        }
    }

    async function fetchImage(cityName) {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=${cityName}&client_id=UYhv5Opf9Yectkju2o9XmKOeQpRkdXKM6hyx0jBzdMI`);
            const images = await response.json();
            return images.urls.regular;
        } catch (error) {
            console.error('Error fetching images:', error);
            return ''; // Return empty string in case of error
        }
    }

    function getWeatherIcon(temperature) {
        if (temperature < 0) {
            return '<i class="fas fa-snowflake weather-icon" style="color: #3498db;"></i>';
        } else if (temperature >= 0 && temperature < 10) {
            return '<i class="fas fa-cloud weather-icon" style="color: #95a5a6;"></i>';
        } else if (temperature >= 10 && temperature < 30) {
            return '<i class="fas fa-sun weather-icon" style="color: #f39c12;"></i>';
        } else {
            return '<i class="fas fa-fire weather-icon" style="color: #e74c3c;"></i>';
        }
    }
});