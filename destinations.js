document.getElementById('searchButton').addEventListener('click', async function () {
    const cityInput = document.getElementById('cityInput').value;

    // Check if the data is already cached
    const cachedData = localStorage.getItem(cityInput);

    if (cachedData) {
        displayResults(JSON.parse(cachedData));
    } else {
        // Fetch data if not cached
        try {
            const response = await fetch(`https://api.teleport.org/api/cities/?search=${cityInput}`);
            const data = await response.json();

            const cityResults = data._embedded['city:search-results'].slice(0, 10); // Limit results to 5

            // Cache the data
            localStorage.setItem(cityInput, JSON.stringify(cityResults));

            // Display the results
            displayResults(cityResults);
        } catch (error) {
            console.error('Error fetching city information:', error);
        }
    }
});



function displayResults(cityResults) {
    const cityInformationContainer = document.getElementById('cityInformation');
    cityInformationContainer.innerHTML = ''; // Clear previous results

    cityResults.forEach(async city => {
        const cityName = city.matching_full_name;

        // Fetch image URL
        const imageUrl = await fetch(`https://api.unsplash.com/photos/random?query=${cityName}&client_id=UYhv5Opf9Yectkju2o9XmKOeQpRkdXKM6hyx0jBzdMI`)
            .then(response => response.json())
            .then(images => images.urls.regular)
            .catch(error => console.error('Error fetching images:', error));

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
    });
}
const logoutButton = document.querySelector(".logout")

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
