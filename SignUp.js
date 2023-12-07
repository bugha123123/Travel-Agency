const Email = document.querySelector(".EmailInput")
const Password = document.querySelector(".PasswordInput")
const Loginbutton = document.querySelector(".LoginButton")
const error = document.getElementById("Error")


function GetData(email, password){

const body = {
    EmailAddress:email,
    Password: password

}

    fetch(`http://localhost:5161/api/user`,{
    method: "POST", 
    body:JSON.stringify(body),
        headers: {
            "content-type":"application/json"
        }
        
    
    
    
    }
    
    
    )  .then(response => response.json())
    .then(commits => console.log(commits)
    
  
    
    
  
    
    )
    
    }

Loginbutton.addEventListener("click", () => {

 
if (Email.value != "" || Password.value != "") {

    if (String(Email.value).toLowerCase().match("@")){

         GetData(Email.value, Password.value)
    }else {

        error.innerText = "Fill out The forms!!!"



       



    }
      
           
      
    

}else{
    console.log("Error");
}
    



})


      
const passwordshowEye = document.querySelector(".passwordshowEyeSignUp")
   



passwordshowEye.addEventListener("click", () => {
    if (Password.type === "password") {
        Password.type = "text";
      } else {
        Password.type = "password";
      }
    
})