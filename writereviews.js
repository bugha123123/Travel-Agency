const SumbitButton = document.querySelector(".SumbitButton")
const title = document.querySelector(".title")
const titleinput = document.querySelector(".titleinput")
const Myreviews = document.querySelector(".Myreviews")
const locationInput = document.querySelector(".locationInput")


function PostReviews(title, titleinput, myreviews, locationinput){


 
    
    const body = {

        Title:title,
        TitleInput: titleinput,
        MyReviews: myreviews,
        LocationInput:locationinput,
    
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


    PostReviews(title.value,titleinput.value,Myreviews.value,locationInput.value);


  
})
