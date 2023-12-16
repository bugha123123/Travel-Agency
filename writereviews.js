// DOM elements
const submitButton = document.querySelector(".SumbitButton");
const titleElement = document.querySelector(".title");
const titleInput = document.querySelector(".titleinput");
const myReviewsElement = document.querySelector(".Myreviews");
const locationInput = document.querySelector(".locationInput");
const fileInput = document.querySelector('#file-input');

// Function to post reviews
function postReviews(title, titleInput, myReviews, locationInput, image) {
    const body = {
        Title: title,
        TitleInput: titleInput,
        MyReviews: myReviews,
        LocationInput: locationInput,
        Image: image
    };

    fetch("http://localhost:5161/api/Reviews", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
}

// Event listener for submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    // Create a new FormData object
    const formData = new FormData();

    // Append the file data to the FormData object
    formData.append('file', fileInput.files[0]);

    if (localStorage.getItem("UserName")) {
        if (titleElement.value !== "" && titleInput.value !== "" && myReviewsElement.value !== "" && locationInput.value !== "") {
            postReviews(titleElement.value, titleInput.value, myReviewsElement.value, locationInput.value, fileInput.value);
            window.open("myreviews.html");
        } else {
            // Update to input background color to red
            titleElement.style.backgroundColor = '#FFCCCC';
            titleInput.style.backgroundColor = '#FFCCCC';
            myReviewsElement.style.backgroundColor = '#FFCCCC';
            locationInput.style.backgroundColor = '#FFCCCC';
            setTimeout(() => {
                titleElement.style.backgroundColor = "";
                titleInput.style.backgroundColor = '';
                myReviewsElement.style.backgroundColor = '';
                locationInput.style.backgroundColor = '';
            },2000);
            // Change alerts to other warnings
        // You can customize this message
        }
    } else {
        // Change alerts to other warnings
         // You can customize this message
         alert('Please Log In')
    }
});
