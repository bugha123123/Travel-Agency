




fetch("http://localhost:5161/api/Reviews",{

method: "GET", 

    headers: {
        "content-type":"application/json"
    }
}).then(resp => resp.json()).then(data=> {



data.forEach(element => {
  if (localStorage.getItem("UserName")) {
    
        let div = document.createElement('div');

        
div.innerHTML =  `<div class="card col-md-6" style="width: 18rem; margin-left: 50px; margin-top: 50px;">
<img src="${element.image}" class="card-img-top" alt="Empty">
<div class="card-body ">
  <h5 class="card-title">${element.title}</h5>
  <p class="card-text">${element.titleInput}</p>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">${element.myReviews}</li>
</ul>
<ul class="list-group list-group-flush" >

 <li class="list-group-item ">${element.locationInput}</li>
</ul>

</div>`

document.querySelector(".myreviewscontainer").appendChild(div) 
  }else{

    document.querySelector(".myreviewscontainer").removeChild(div)
  }


});


})

if (localStorage.getItem("UserName")) {
  document.querySelector(".signinbutton").style.display = "none"
  document.querySelector(".signupbutton").style.display = "none"
  document.querySelector(".divider").style.display = "none"
  document.querySelector(".ProfileCardOpen").style.display = "block"
  document.querySelector(".googleicon").style.display = "block"
  document.querySelector(".Options").style.display = "none"
  document.querySelector(".logout").style.display = "block"
  document.querySelector(".divider").style.display = "block"
}else{
  document.querySelector(".signinbutton").style.display = "block"
  document.querySelector(".signupbutton").style.display = "block"
  document.querySelector(".divider").style.display = "block"
  document.querySelector(".ProfileCardOpen").style.display = "none"
  document.querySelector(".googleicon").style.display = "none"
  document.querySelector(".Options").style.display = "block"
  document.querySelector(".logout").style.display = "none"
  document.querySelector(".divider").style.display = "none"
}