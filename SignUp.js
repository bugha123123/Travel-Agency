const Email = document.querySelector(".EmailInput")
const Password = document.querySelector(".PasswordInput")
const Loginbutton = document.querySelector(".LoginButton")
const error = document.getElementById("Error")
const UserName = document.querySelector(".UserNameInput")

function GetData(email, password, UserName){


 


    
  
    
const body = {
    UserName:UserName,
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
    .then(commits => console.log(""))
    
  
    
    
  
    

    
    }

Loginbutton.addEventListener("click", () => {

 
if (Email.value != "" || Password.value != "" || UserName.value != "" ) {

    if (String(Email.value).toLowerCase().match("@gmail")){

         GetData(Email.value, Password.value, UserName.value)
         window.open("index.html")
    }else{
        alert("Error Try Again")
    }
      
           
      
    

}else{
    alert("Error Try Again")
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