const EmailInput = document.querySelector('.EmailInput');
const LoginButton = document.querySelector('.LoginButton');
const codeInput = document.querySelector('.codeInput');
const ConfirmCodeInput = document.querySelector('.ConfirmCodeInput');
const Codedelaytime = document.querySelector('.Codedelaytime');

let isSendingCode = false; // Flag to track whether the code is currently being sent

function ForgotPassword(email, code) {
  const body = {
    To: email,
    body: code,
  };

  fetch(`http://localhost:5161/api/sendEmail`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((commits) => {
      console.log(body.body);
      localStorage.setItem('VerificationCode', body.body);
    });
}

LoginButton.addEventListener('click', () => {
  if (!isSendingCode) {
    isSendingCode = true; // Set the flag to indicate code is being sent
    LoginButton.disabled = true; // Disable the button during the delay

    let countdown = 15; // Set the initial countdown time

    const countdownInterval = setInterval(() => {
      Codedelaytime.textContent = `Resend code in ${countdown} seconds`;

      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval); // Clear the interval when countdown reaches 0
        Codedelaytime.textContent = ''; // Remove the countdown text
        LoginButton.disabled = false; // Enable the button
        isSendingCode = false; // Reset the flag after sending code
      }
    }, 1000);

    // Generate and send code after a 15-second delay
    setTimeout(() => {
      ForgotPassword(EmailInput.value, generateString(10));
    }, 15000);
  }
});

ConfirmCodeInput.addEventListener('click', () => {
  const generatedCode = localStorage.getItem('VerificationCode');
  console.log(generatedCode);
  const userInput = codeInput.value;
  console.log(userInput);

  if (generatedCode.trim() === userInput.trim()) {
    alert('Verification Passed');
    localStorage.removeItem('VerificationCode');
    window.open('resetpassword.html');
  } else {
    alert('Wrong Verification Code');
    localStorage.removeItem('VerificationCode');
  }
});

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
