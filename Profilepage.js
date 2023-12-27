const Name = document.querySelector(".name")
 const logoutButton = document.querySelector(".logout")

const UserName = localStorage.getItem("UserName")

if (UserName) {
  Name.innerHTML = UserName;
}else{
  Name.innerHTML = "User"
}

logoutButton.addEventListener("click", () => {
  // Clear user name from local storage and display
  window.localStorage.removeItem("UserName");
  userNameDisplay.innerHTML = "";
});





if (localStorage.getItem("UserName")) {
  document.querySelector(".googleicon").style.display = "block"
    document.querySelector(".signinbutton").style.display = "none"
    document.querySelector(".signupbutton").style.display = "none"
    document.querySelector(".divider").style.display = "none"
    document.querySelector(".Options").style.display = "none"
    document.querySelector(".ProfileCardOpen").style.display = "block"
    logoutButton.style.display = "block"
 }else{
   
   
     document.querySelector(".googleicon").style.display = "none"
     document.querySelector(".signinbutton").style.display = "block"
     document.querySelector(".signupbutton").style.display = "block"
     document.querySelector(".divider").style.display = "none"
     document.querySelector(".Options").style.display = "block"
     document.querySelector(".ProfileCardOpen").style.display = "none"
     logoutButton.style.display = "none"
 }


 const LOCALSTORAGEEMAILADDRESS = localStorage.getItem("EmailAddress")

const InputUserName = document.querySelector(".editUserName")

const InputEmailAddress = document.querySelector(".editEmailAddress")

const InputPassword = document.querySelector(".editPassword")



async function UpdateProfileData(NewUserName, NewEmailAddress, NewPassword){

const body = {
  UserName:NewUserName,
  EmailAddress:NewEmailAddress,
  Password: NewPassword
}

 await fetch(`http://localhost:5161/api/Profile/${LOCALSTORAGEEMAILADDRESS}`,{

    method: "PUT",
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json"
    }

  })
  .then(resp => resp.json()).then(data => console.log(data))


 }

document.querySelector(".update-profile-button").addEventListener("click", () => {

  UpdateProfileData(InputUserName.value,InputEmailAddress.value, InputPassword )


})

