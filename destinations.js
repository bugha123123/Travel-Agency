document.addEventListener('DOMContentLoaded', async function () {
    const cityInput = document.getElementById('cityInput').value;
    let cityResults = getStoredCityResults(cityInput);

    if (!cityResults) {
        cityResults = await fetchAndStoreResults(cityInput);
    }

    displayResults(cityResults);

    document.getElementById('searchButton').addEventListener('click', async function () {
        const cityInput = document.getElementById('cityInput').value;
        const newCityResults = await fetchAndStoreResults(cityInput);
        displayResults(newCityResults);
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
});

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

function getStoredCityResults(cityInput) {
    const cachedData = localStorage.getItem(cityInput);
    return cachedData ? JSON.parse(cachedData) : null;
}

function displayResults(cityResults) {
    const cityInformationContainer = document.getElementById('cityInformation');
    cityInformationContainer.innerHTML = ''; // Clear previous results

    for (const city of cityResults) {
        const cityName = city.matching_full_name;

        // Fetch image URL
        const imageUrl = fetchImage(cityName);

        // Create a Bootstrap card for each city with image URL and city name
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="Image Limit Exceeded Wait 1 HOUR">
            <div class="card-body">
                <h5 class="card-title">${cityName}</h5>
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
