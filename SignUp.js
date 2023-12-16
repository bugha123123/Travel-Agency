const Email = document.querySelector(".EmailInput");
const Password = document.querySelector(".PasswordInput");
const Loginbutton = document.querySelector(".LoginButton");
const error = document.getElementById("Error");
const UserName = document.querySelector(".UserNameInput");
const passwordshowEyeSignUp = document.querySelector(".passwordshowEyeSignUp");

function getData(email, password, userName) {
    return fetch("http://localhost:5161/api/user", {
        method: "POST",
        body: JSON.stringify({
            UserName: userName,
            EmailAddress: email,
            Password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Error:", error);
        return { error: "An error occurred. Please try again." };
    });
}

function isGmail(email) {
    return email.toLowerCase().includes("@gmail.com");
}

function isEmailUnique(email) {
    return fetch(`http://localhost:5161/api/user/${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(result => result);
}

Loginbutton.addEventListener("click", () => {
    const email = Email.value.trim();
    const password = Password.value.trim();
    const userName = UserName.value.trim();

    if (localStorage.getItem("UserName")) {
        alert("First Log Out");
        return;
    }

    if (!email || !password || !userName) {
        alert("Error: Please fill in all the fields");
        return;
    }

    if (!isGmail(email)) {
        alert("Error: Email address must be a Gmail account");
        return;
    }

    isEmailUnique(email)
        .then(isUnique => {
            if (!isUnique) {
                alert("Error: Email Address already exists");
            } else {
                // Email is unique, proceed with sign up
                getData(email, password, userName)
                    .then(({ existingUser, error: fetchError }) => {
                        if (fetchError) {
                            alert(fetchError);
                            return;
                        }

                        if (existingUser) {
                            alert("Error: Email Address already exists");
                        } else {
                            alert("Signed Up");
                        }
                        
                    });
            }
        });
});

passwordshowEyeSignUp.addEventListener("click", () => {
    Password.type = Password.type === "password" ? "text" : "password";
});
