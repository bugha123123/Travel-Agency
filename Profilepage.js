const Name = document.querySelector(".name")
 

const UserName = localStorage.getItem("UserName")

if (UserName) {
  Name.innerHTML = UserName;
}else{
  Name.innerHTML = "User"
}






  