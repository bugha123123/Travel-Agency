const resetPasswordButton = document.querySelector(".resetpassword");
const resetPasswordFirstValue = document.querySelector(".EmailValue");
const resetPasswordSecondValue = document.querySelector(".NewPasswordValue");

function updatePassword(emailAddress, password) {
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
            alert("Password changed successfully");
            // Handle success scenarios, such as showing a success message to the user
        })
        .catch(error => {
            console.error("Fetch error:", error);
            // Handle errors, e.g., display an error message to the user
        });
    } else {
        alert("Form can't be empty");
    }
}

resetPasswordButton.addEventListener("click", () => {
    updatePassword(resetPasswordFirstValue.value, resetPasswordSecondValue.value);
});
