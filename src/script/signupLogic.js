function myAlert( icon, title) {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: icon,
    title: title,
    timer: 5000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: 'custom-toast',
    },
    willOpen: () => {
      const style = document.createElement('style');
      style.innerHTML = `
                        .custom-toast {
                            font-family: 'Arial', sans-serif;
                            font-size: 12px;
                            background-color: rgb(255, 255, 255);
                            color: #262626;
                        }
                    `;
      document.head.appendChild(style);
    },
  });
}
function login(){
   window.location.href = `https://server.markethealers.com/markethealers/auth/login`;

}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.btnClick').click();
  }
});
// my myAlert("error", 'warning', 'hello world'); // error , success

let isRequestInProgress = false;
var email;

function googleLoginButton() {
  window.location.href = `https://server.markethealers.com/markethealers/auth/auth/google`;
}

function githubLoginButton() {
  window.location.href = `https://server.markethealers.com/markethealers/auth/auth/github`;
}

async function getOTP() {
  if (isRequestInProgress) return;

  const emailField = document.getElementById('email');
  const otpButton = document.getElementById('otpButton');
  email = emailField.value;

  if (!email) {
     myAlert("error", 'Please enter your email.');
    return;
  }

  isRequestInProgress = true;
  otpButton.disabled = true;
  otpButton.innerText = 'Requesting...';

  try {
    const response = await axios.post(
      `https://server.markethealers.com/markethealers/auth/auth/markethealers`,
      { email },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
     myAlert('success', response.data.message);

    document.getElementById('signupBOX').innerHTML = `
   <div class="group" >
    <input required="" type="text" id="otp" class="input">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label for="otp">Enter Your 6-digit OTP</label>
    <button style="width:150px; left:20%" type="button" onclick="submitOTP()" class="button btnClick">Submit OTP</button>
</div>

        `;

    document
      .getElementById('otp')
      .addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          submitOTP();
        }
      });
  } catch (error) {
     myAlert("error", 
      error.response?.data?.message || 'An error occurred. Please try again.'
    );
    otpButton.disabled = false;
    otpButton.innerText = 'Get OTP';
  } finally {
    isRequestInProgress = false;
  }
}

function submitOTP() {
  const otp = document.getElementById('otp')?.value;

  if (!otp || otp.length !== 6) {
     myAlert("error", 'Please enter a valid 6-digit OTP.');
    return;
  }

  axios
    .post(
      `https://server.markethealers.com/markethealers/auth/auth/markethealers/verifyotp`,
      { otp },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
       myAlert('success', response.data.message);
      window.location.href = `https://server.markethealers.com/markethealers/auth/newUserInfo?email=${email}&platform=markethealers`;
    })
    .catch((error) => {
       myAlert("error", error.response?.data?.message || 'Invalid OTP. Please try again.');
    });
}

document.getElementById('email').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getOTP();
  }
});
