const EmailInput = document.querySelector('.EmailInput')
const LoginButton = document.querySelector(".LoginButton")
const codeInput = document.querySelector(".codeInput")
const fathumbsup = document.querySelector(".fa-thumbs-up")



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
    console.log("good");
//working

  }
  

  
  

  
  )

}




LoginButton.addEventListener("click", () => {

     ForgotPassword(EmailInput.value, generateString(30));
  
    

   
})

// not working yet
fathumbsup.addEventListener("click", () => {

 
})

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}




