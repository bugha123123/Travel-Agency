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

      // After sending the code, set a delay before allowing to send again
      setTimeout(() => {
        isSendingCode = false;
        LoginButton.style.backgroundColor = '';
        LoginButton.style.color = '';
      }, 15000);

      // Change Send Code button color after sending the code
      LoginButton.style.backgroundColor = 'green';
      LoginButton.style.color = 'white';
    });
}

// Check codeInput value on page load and set ConfirmCodeInput's disabled property
ConfirmCodeInput.disabled = codeInput.value.trim() === '';

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
      }
    }, 1000);

    // Generate and send code immediately
    ForgotPassword(EmailInput.value, generateString(10));
  }
});

// Add an input event listener to dynamically enable/disable ConfirmCodeInput
codeInput.addEventListener('input', () => {
  ConfirmCodeInput.disabled = codeInput.value.trim() === '';
});

ConfirmCodeInput.addEventListener('click', () => {
  const generatedCode = localStorage.getItem('VerificationCode');

  // Check if there is no code in localStorage
  if (!generatedCode) {
    return; // Do nothing if no code is found
  }

  const userInput = codeInput.value.trim(); // Trim any leading or trailing spaces

  if (userInput === '') {
    // Code input is empty, show an error and change background color
    codeInput.style.backgroundColor = 'red';

    // Reset the background color after 5 seconds
    setTimeout(() => {
      codeInput.style.backgroundColor = '';
    }, 5000);

    return; // Exit the function to prevent further execution
  }

  if (generatedCode.trim() === userInput) {
    // Verification Passed
    codeInput.style.backgroundColor = 'green';
    codeInput.style.color = 'white';
    localStorage.removeItem('VerificationCode');

    // Change background color to green

    // Change placeholder color to a color that suits green (e.g., white)

    window.open('resetpassword.html');
  } else {
    // Wrong Verification Code
    codeInput.style.backgroundColor = 'red';
    codeInput.style.color = 'white';
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
