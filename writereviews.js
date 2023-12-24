// DOM elements
const submitButton = document.querySelector(".SumbitButton");
const titleElement = document.querySelector(".title");
const titleInput = document.querySelector(".titleinput");
const myReviewsElement = document.querySelector(".Myreviews");
const locationInput = document.querySelector(".locationInput");
const fileInput = document.querySelector('#file-input');
const logoutButton = document.querySelector(".logout");
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
//To implement length validation on inputs in your code, you can modify the event listener for the submit button to check the length of each input and display an error if it doesn't meet the specified criteria. Here's an updated version of your code:



// Event listener for submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    // Create a new FormData object
    const formData = new FormData();

    // Append the file data to the FormData object
    formData.append('file', fileInput.files[0]);

    if (localStorage.getItem("UserName")) {
        // Check length validation for each input
        const titleValue = titleElement.value.trim();
        const titleInputValue = titleInput.value.trim();
        const myReviewsValue = myReviewsElement.value.trim();
        const locationInputValue = locationInput.value.trim();

        const maxLength = 50;
        const minLength = 5;

        if (
            titleValue.length >= minLength && titleValue.length <= maxLength &&
            titleInputValue.length >= minLength && titleInputValue.length <= maxLength &&
            myReviewsValue.length >= minLength && myReviewsValue.length <= maxLength &&
            locationInputValue.length >= minLength && locationInputValue.length <= maxLength
        ) {
            postReviews(titleValue, titleInputValue, myReviewsValue, locationInputValue, fileInput.value);
            window.open("myreviews.html");
        } else {
            // Update input background color to indicate an error
            titleElement.style.backgroundColor = '#FFCCCC';
            titleInput.style.backgroundColor = '#FFCCCC';
            myReviewsElement.style.backgroundColor = '#FFCCCC';
            locationInput.style.backgroundColor = '#FFCCCC';
            
            // Display an error message or handle it as you prefer
            alert('Input length should be between 5 and 50 characters.');

            setTimeout(() => {
                titleElement.style.backgroundColor = "";
                titleInput.style.backgroundColor = '';
                myReviewsElement.style.backgroundColor = '';
                locationInput.style.backgroundColor = '';
            }, 2000);
        }
    } else {
        // Change alerts to other warnings
        // You can customize this message
        alert('Please Log In');
    }
});


logoutButton.addEventListener("click", () => {

localStorage.removeItem("UserName")


})


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
