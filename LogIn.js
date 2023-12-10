

const SignedUpEmail = document.querySelector(".EmailInput")
const Password = document.querySelector(".PasswordInput")
const LogInButton = document.querySelector(".LoginButton")
const SignedInUser = document.querySelector(".SignedInUser") 

function GetData(){

 


fetch(`http://localhost:5161/api/user`,{
method: "GET", 

    headers: {
        "content-type":"application/json"
    }
    



}


)  .then(response => 
    response.json()
 
)
.then(commits => {





const propertyValues = Object.values(commits);


propertyValues.forEach(x=>{

if (SignedUpEmail.value === x.emailAddress && Password.value === x.password) {
  document.querySelector(".Welcome").innerHTML = `Welcome ${x.emailAddress}`

  window.localStorage.setItem("EmailAddress",x.emailAddress)
  window.location.replace("/")
 

}
   
  



})




    
}    );









}




LogInButton.addEventListener("click", () => {

if (SignedUpEmail.value != null || Password.value != null) {
   GetData()
   
}
   
           
      
})


      
const passwordshowEye = document.querySelector(".passwordshowEye")
   



passwordshowEye.addEventListener("click", () => {
    if (Password.type === "password") {
        Password.type = "text";
      } else {
        Password.type = "password";
      }
    
})




