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
    .then(commits => {

const convertedcommits = Object.values(commits)

        const existingUser = convertedcommits.find(user => user.EmailAddress === email);

        if (existingUser) {
            // A user with the specified email address already exists
            console.error("A user with the specified email address already exists");
            return;
        }
 
});

    
    
  
    
    
  
    

    
    }

Loginbutton.addEventListener("click", () => {

 
if (Email.value != "" || Password.value != "" || UserName.value != "" ) {

    if (String(Email.value).toLowerCase().match("@gmail.com")){

         GetData(Email.value, Password.value, UserName.value)
      
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