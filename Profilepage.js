const Name = document.querySelector(".name")
 

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
  document.querySelector(".signinbutton").style.display = "none"
  document.querySelector(".signupbutton").style.display = "none"
  document.querySelector(".divider").style.display = "none"
  document.querySelector(".ProfileCardOpen").style.display = "block"
  document.querySelector(".googleicon").style.display = "block"
  document.querySelector(".Options").style.display = "none"
 
}else{
  document.querySelector(".signinbutton").style.display = "block"
  document.querySelector(".signupbutton").style.display = "block"
  document.querySelector(".divider").style.display = "block"
  document.querySelector(".ProfileCardOpen").style.display = "none"
  document.querySelector(".googleicon").style.display = "none"
  document.querySelector(".Options").style.display = "block"


}