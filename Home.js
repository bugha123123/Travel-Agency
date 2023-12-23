// DOM elements
const searchInputHomePage = document.querySelector("#input");
const searchButton = document.querySelector("#Search");
const logoutButton = document.querySelector(".logout");
const userNameDisplay = document.querySelector(".name");
const recentSearchesContainer = document.querySelector(".RecentSearchesContainer");
const formBox = document.querySelector(".formBox");



// Function to post user searches
function postData(searchTerm) {
    const requestBody = {
        UserSearched: searchTerm
    };

    fetch('http://localhost:5161/api/UserSearch', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(commits => {
        // Display recent searches
        const searchCard = document.createElement("div");
        searchCard.classList.add("RecentSearchesDiv");
        searchCard.innerHTML = `
            <div class="card text-bg-light mb-3" style="max-width: 18rem;">
                <div class="card-header"><i class="fas fa-location-dot"></i></div>
                <div class="card-body">
                    <h5 class="card-title">${requestBody.UserSearched}</h5>
                </div>
            </div>
        `;
        recentSearchesContainer.appendChild(searchCard);
    });
}

// Function to get country data
function getCountries() {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => {
        const countries = Object.values(data)[2];
        countries.forEach(country => {
            if (searchInputHomePage.value.toLowerCase() === country.name.toLowerCase()) {
                // Display country info
                const countryCard = document.createElement("div");
                countryCard.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${country.flag}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
                        </div>
                    </div>
                `;
                formBox.appendChild(countryCard);
            }
        });
    });
}

// Event listeners
searchButton.addEventListener("click", () => {
    postData(searchInputHomePage.value);
    getCountries();
});

logoutButton.addEventListener("click", () => {
    // Clear user name from local storage and display
    window.localStorage.removeItem("UserName");
    userNameDisplay.innerHTML = "";
});

if (localStorage.getItem("UserName")) {
    document.querySelector(".signinbutton").style.display = "none"
    document.querySelector(".signupbutton").style.display = "none"
    document.querySelector(".divider").style.display = "none"
    document.querySelector(".ProfileCardOpen").style.display = "block"
    document.querySelector(".googleicon").style.display = "block"
    document.querySelector(".Options").style.display = "none"
   
}else{
    document.querySelector(".signinbutton").style.display = "block"
    document.querySelector(".signupbutton").style.display = "block"
    document.querySelector(".divider").style.display = "block"
    document.querySelector(".ProfileCardOpen").style.display = "none"
    document.querySelector(".googleicon").style.display = "none"
    document.querySelector(".Options").style.display = "block"
  

}

