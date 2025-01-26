let email;
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.btnClick').click();
  }
});

function myAlert(icon, title) {
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

function googleLoginButton() {
  window.location.href = `https://server.markethealers.com/markethealers/auth/auth/google`;
}

async function getOTP() {
  myAlert('info','Validating...');
  email = document.getElementById('email').value;
  document.getElementById('email').value='';
  if (!email || !validateEmail(email)) {
    myAlert('error', 'Please enter a valid email address.');
    return;
  }
  window.localStorage.setItem('email', email);
  await axios
    .post(
      `https://server.markethealers.com/markethealers/auth/forgotPasswordGetOtp`,
      { email },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      myAlert('success', response.data.message);

      document.getElementById('box').innerHTML = `
<div class="container">
    <div id="submitOtp">
        <h3>Otp sent to ${email}</h3>
        <h3>Kindly check your inbox or spam</h3>
        <div class="group">
            <input required="" type="text" id="otp" class="input">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label for="otp">Enter Your 6-digit OTP</label>
        </div><br>
        <div class="group">
            <button type="button" onclick="submitOTP()" id="butt" class="btnClick">Submit OTP</button>
        </div>
    </div>

</div>
`;
    })
    .catch((error) => {
      if (error?.response?.data?.message) {
        myAlert(
          'error',
          error.response?.data?.message + ' redirecting to Singup Page'
        );
        setTimeout(() => {
          window.location.href = `https://server.markethealers.com/markethealers/auth/signup`;
        }, 3000);
      } else { 
        myAlert('error', 'Something Went Wrong ');
      }
    });
}

async function submitOTP() {
  myAlert('info', 'Validating...');
  const otp = document.getElementById('otp').value;
  if (otp.length !== 6 || isNaN(otp)) {
    myAlert('error', 'Please enter a valid OTP.');
    return;
  }

  email = window.localStorage.getItem('email');
  await axios
    .post(
      `https://server.markethealers.com/markethealers/auth/forgotPasswordVerifyOtp`,
      { otp, email },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      myAlert('success', response.data.message);
      document.getElementById('box').innerHTML = `
        <form id="resetForm">
    <h1>Reset Password</h1>
    <div class="group">
        <input required="" type="password" id="newPassword" class="input" minlength="8">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="newPassword">New Password</label>
    </div>
    <div class="group">
        <input required="" type="password" id="confirmPassword" class="input" minlength="8">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="confirmPassword">Confirm Password</label>
    </div>
    <div class="group">
        <button type="button" onclick="resetPassword()"  class="btnClick" id="reset">Reset Password</button>
    </div>
</form>
      `;
      window.localStorage.setItem('email', '');
    })
    .catch((error) => {
      let swe = error.response.data.message || error.response || error;
      myAlert('error', swe);
    });
}

async function resetPassword() {
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (newPassword !== confirmPassword) {
    myAlert('error', 'Passwords do not match.');
    return;
  }
  if (newPassword.length < 8) {
    myAlert('error', 'Password must be at least 8 characters long.');
    return;
  }
  await axios
    .post(
      `https://server.markethealers.com/markethealers/auth/resetPassword`,
      { password: newPassword },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      myAlert('success', response.data.message);
      window.location.href = `https://server.markethealers.com/markethealers/auth/`;
    })
    .catch((error) => {
      myAlert('error', error.response.data.message);
    });
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
