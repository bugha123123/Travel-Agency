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

        
        
        }).then(resp => resp.text()).then(data=> {


            
        })
}


resetpasswordbutton.addEventListener("click", () => {

UpdatePassword(ResetPasswordFirstValue.value,ResetPasswordSecondValue.value)
    
})