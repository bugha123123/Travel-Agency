

const SignedUpEmail = document.querySelector(".EmailInput")
const Password = document.querySelector(".PasswordInput")
const LogInButton = document.querySelector(".LoginButton")
const SignedInUser = document.querySelector(".SignedInUser") 
const UserName = document.querySelector(".UserNameInput")
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



console.log(commits);

const propertyValues = Object.values(commits);


propertyValues.forEach(x=>{

if (SignedUpEmail.value === x.emailAddress && Password.value === x.password && UserName.value === x.userName) {
 

  window.localStorage.setItem("UserName",x.userName)
 alert("Logged In")
 

}
   
  



})




    
}    );









}




LogInButton.addEventListener("click", () => {

if (SignedUpEmail.value != null || Password.value != null ||UserName.value != null ) {
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




