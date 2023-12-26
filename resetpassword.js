const resetPasswordButton = document.querySelector(".resetpassword");
const resetPasswordFirstValue = document.querySelector(".EmailValue");
const resetPasswordSecondValue = document.querySelector(".NewPasswordValue");
const successMessage = document.querySelector(".SuccessMessage");

function updatePassword(emailAddress, password) {
    // Check if the password meets the length criteria
    if (password.length > 5 && password.length <= 20) {
        if (emailAddress && password) {
            const body = {
                EmailAddress: emailAddress,
                Password: password
            };

            fetch("http://localhost:5161/api/user", {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }
                return resp.text();
            })
            .then(data => {
                // Handle success scenarios, such as showing a success message to the user


                successMessage.textContent = "Password changed successfully";
                successMessage.style.color = "green";
                // Clear the inputs
                resetPasswordFirstValue.value = "";
                resetPasswordSecondValue.value = "";

                // Clear the success message after 10 seconds
                setTimeout(() => {
                    successMessage.textContent = "";
                }, 10000);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                // Handle errors, e.g., display an error message to the user
            });
        } else {
            alert("Form can't be empty");
        }
    } else {
        document.querySelector(".InputLengthCheck").textContent = "Password must be between 6 and 19 characters"
      
    }
}

resetPasswordButton.addEventListener("click", () => {
    updatePassword(resetPasswordFirstValue.value, resetPasswordSecondValue.value);
});

// Add input event listeners to clear the success message if the user starts typing
resetPasswordFirstValue.addEventListener("input", () => {
    successMessage.textContent = "";
});

resetPasswordSecondValue.addEventListener("input", () => {
    successMessage.textContent = "";
});

resetPasswordButton.addEventListener("click", () => {
    updatePassword(resetPasswordFirstValue.value, resetPasswordSecondValue.value);
});
const passwordInput = document.getElementById("passwordInput");
const eyeIcon = document.getElementById("eyeIcon");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    eyeIcon.textContent = type === "password" ? "visibility" : "visibility_off";
});






