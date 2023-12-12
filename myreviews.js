




fetch("http://localhost:5161/api/Reviews",{

method: "GET", 

    headers: {
        "content-type":"application/json"
    }
}).then(resp => resp.json()).then(data=> {

    console.log(data)

data.forEach(element => {
  if (localStorage.getItem("UserName")) {
        let div = document.createElement('div');
div.innerHTML =  `<div class="card" style="width: 18rem; margin-left: 102px; margin-top: 50px;">
<img src="${element.image}" class="card-img-top" alt="Empty">
<div class="card-body">
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

