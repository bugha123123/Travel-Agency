const Name = document.querySelector(".name")
 const logoutButton = document.querySelector(".logout")



logoutButton.addEventListener("click", () => {
  // Clear user name from local storage and display
  window.localStorage.removeItem("UserName");

});

const updateProfileUI = () => {
  const UserName = localStorage.getItem("UserName");

  if (UserName) {
    Name.innerHTML = UserName;
  } else {
    Name.innerHTML = "User";
  }

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

};






 const LOCALSTORAGEEMAILADDRESS = localStorage.getItem("EmailAddress");

 const InputUserName = document.querySelector(".editUserName");
 const InputEmailAddress = document.querySelector(".editEmailAddress");
 const InputPassword = document.querySelector(".editPassword");
 const UpdateProfileData = async (NewUserName, NewEmailAddress, NewPassword) => {
  const body = {
    UserName: NewUserName,
    EmailAddress: NewEmailAddress,
    Password: NewPassword,
  };

  try {
    const response = await fetch(`http://localhost:5161/api/user/${LOCALSTORAGEEMAILADDRESS}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Update local storage with new user details
    localStorage.setItem("UserName", NewUserName);
    localStorage.setItem("EmailAddress", NewEmailAddress);

    // Dynamically update profile name
    Name.innerHTML = NewUserName;

    // Update UI elements based on user profile
    updateProfileUI();

  } catch (error) {
    console.error("Error updating profile:", error);

    // Log additional information about the error
    console.log("Response status:", error.response?.status);
    console.log("Response body:", error.response?.body);

    // Handle the error as needed (e.g., display a user-friendly message)
  }
};

document.querySelector(".update-profile-button").addEventListener("click", () => {
  UpdateProfileData(
    InputUserName.value,
    InputEmailAddress.value,
    InputPassword.value
  );
});


// Call this function on page load to ensure the UI reflects the initial user profile
updateProfileUI();

