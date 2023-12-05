

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

const NewObject = Object.values(commits)



const propertyValues = Object.values(commits);


propertyValues.forEach(x=>{

if (SignedUpEmail.value === x.emailAddress && Password.value === x.password) {
  document.querySelector(".Welcome").innerHTML = `Welcome ${x.emailAddress}`
  alert("Logged In")
}


})




    
}    );









}




LogInButton.addEventListener("click", () => {

if (SignedUpEmail.value != null || Password.value != null) {
   GetData()
   
}
   
           
      
})

