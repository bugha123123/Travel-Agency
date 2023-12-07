const SearchInputHomePage = document.querySelector("#input")
const SearchButton = document.querySelector("#Search")
const logout = document.querySelector(".logout")


function PostData(Searches){


    const body = {

        UserSearched:Searches
       
    }

fetch('http://localhost:5161/api/UserSearch',{
method: "POST", 
    body:JSON.stringify(body),
    headers: {
        "content-type":"application/json"
    }
    



}


)  .then(response => response.json())
.then(commits => {

    

    const div = document.createElement("div")
    div.classList.add("RecentSearchesDiv")
div.innerHTML = 
`<div class="card text-bg-light mb-3" style="max-width: 18rem;">
<div class="card-header"><i class="fas fa-location-dot"></i></div>
<div class="card-body">
  <h5 class="card-title">${body.UserSearched}</h5>
 
</div>
</div>
`

document.querySelector(".RecentSearchesContainer").appendChild(div)











});

}



 





function GetCountries(){



fetch("https://countriesnow.space/api/v0.1/countries/flag/images",
{

    method:"GET",
    headers: {
        "content-type":"application/json"
    }
}


).then(resp => resp.json()).then(data => {

    const Massive = Object.values(data);

    Massive[2].forEach(element => {
    
        console.log(element);
      if (SearchInputHomePage.value == element.name) {
        const div  = document.createElement("div")
        div.innerHTML = `<div class="card" style="width: 18rem;">
        <img style ="" src="${element.flag}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
         
        </div>
      </div>`
    
      document.querySelector(".formBox").appendChild(div)
    
      }
});














})}



SearchButton.addEventListener("click", () => {

       PostData(SearchInputHomePage.value);
       GetCountries();
})
 
 

logout.addEventListener("click", () => {

    window.localStorage.removeItem("EmailAddress");
    
    
    })
    
   
        
  
      
 

