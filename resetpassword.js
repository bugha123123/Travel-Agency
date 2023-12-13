const resetpasswordbutton = document.querySelector(".resetpassword");
const ResetPasswordFirstValue = document.querySelector(".EmailValue")
const ResetPasswordSecondValue = document.querySelector(".NewPasswordValue")

function UpdatePassword(emailAddress, password){
const body = {

    EmailAddress: emailAddress,
    Password: password
}


    fetch("http://localhost:5161/api/user", {
        method: "PUT",
        body: JSON.stringify(body),

headers: {
    "content-type":"application/json"
}

        
        
        }).then(resp => resp.text()).then(data=> console.log(data))
}


resetpasswordbutton.addEventListener("click", () => {
if (ResetPasswordFirstValue.value != null ||ResetPasswordSecondValue.value != null ) {
    UpdatePassword(ResetPasswordFirstValue.value,ResetPasswordSecondValue.value);
    window.open("logger.html")
}else{
    alert("Form can't be empty")
}


    
})