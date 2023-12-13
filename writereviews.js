const SumbitButton = document.querySelector(".SumbitButton")
const title = document.querySelector(".title")
const titleinput = document.querySelector(".titleinput")
const Myreviews = document.querySelector(".Myreviews")
const locationInput = document.querySelector(".locationInput")

const fileInput = document.querySelector('#file-input');
function PostReviews(title, titleinput, myreviews, locationinput, image){


 
    
    const body = {

        Title:title,
        TitleInput: titleinput,
        MyReviews: myreviews,
        LocationInput:locationinput,
        Image:image
    
    }

    fetch("http://localhost:5161/api/Reviews",{

method: "POST",
body: JSON.stringify(body),

headers: {
    "content-type":"application/json"
}



}).then(resp => resp.json()).then(data => console.log(data))
}


SumbitButton.addEventListener("click", (e)=>{

    e.preventDefault();


  // Create a new FormData object
  const formData = new FormData();

  // Append the file data to the FormData object
  formData.append('file', fileInput.files[0]);


if (localStorage.getItem("UserName")) {
        PostReviews(title.value,titleinput.value,Myreviews.value,locationInput.value,fileInput.value);
        window.open("myreviews.html")
}else{
    alert("Log in ")
}




  
})


