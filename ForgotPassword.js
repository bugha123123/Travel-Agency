const EmailInput = document.querySelector('.EmailInput')
const LoginButton = document.querySelector(".LoginButton")
const codeInput = document.querySelector(".codeInput")
const fathumbsup = document.querySelector(".fa-thumbs-up")
const ConfirmCodeInput = document.querySelector(".ConfirmCodeInput")


function ForgotPassword(email, code){

 const body = {

    To:email,
    body: code
 
   

};



fetch(`http://localhost:5161/api/sendEmail`,{
  method: "POST", 
  body:JSON.stringify(body),

      headers: {
          "content-type":"application/json"
      }
      
  
  
  
  }
  
  
  )  .then(response => response.text())
  .then(commits => {
    console.log(body.body);

  
    localStorage.setItem('VerificationCode', body.body);


  }
  

  
  

  
  )

}




LoginButton.addEventListener("click", () => {

     ForgotPassword(EmailInput.value, generateString(10));

    

   
})
ConfirmCodeInput.addEventListener("click", () => {
    const generatedCode = localStorage.getItem('VerificationCode')
    console.log(generatedCode);
    const userInput = codeInput.value;
console.log(userInput);   

if (generatedCode.trim() === userInput.trim()) {
alert("Verification Passed")
        localStorage.removeItem('VerificationCode'); 
        window.location.replace("/resetpassword.html")
    } else {
       alert("Wrong Verification Code");
       localStorage.removeItem("VerificationCode")
    }
  });





const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}




