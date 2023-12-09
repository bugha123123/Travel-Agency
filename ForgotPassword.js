const EmailInput = document.querySelector('.EmailInput')
const LoginButton = document.querySelector(".LoginButton")
const codeInput = document.querySelector(".codeInput")




function ForgotPassword(email, code){

 const body = {

    To:email,
    body:code
 
   

}


fetch("http://localhost:5161/api/sendEmail", {

method: "POST",
body: JSON.stringify(body),
headers: {
    "content-type":"application/json"
}


}).then(resp => resp.json()).then(data => console.log(data))


}




LoginButton.addEventListener("click", () => {

     ForgotPassword(EmailInput.value, );
    

   
})

const generateRandomString = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
  
    // Create an array of 32-bit unsigned integers
    const randomValues = new Uint32Array(length);
    
    // Generate random values
    window.crypto.getRandomValues(randomValues);
    randomValues.forEach((value) => {
      result += characters.charAt(value % charactersLength);
    });
    return result;
  }





