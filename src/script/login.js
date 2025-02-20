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

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.btnClick').click();
  }
});

function signup() {
  location.href = `https://auth.markethealers.com/src/AuthPage/signup.html`;
}

async function login() {
  try {
   let userName = document.getElementById('userName').value;
   let password = document.getElementById('password').value;

   if (userName.includes('@')) {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(userName)) {
       myAlert('error', 'Invalid email format');
       return;
     } 
   } else {
     
     if (userName.length < 7) {
       myAlert('error', 'Username must be at least 7 characters');
       return;
     } 
   }

    if (password.length < 7) {
      myAlert('error', 'Password must be at least 7 characters');
      return;
    }
    await axios
      .post(
        `https://server-guard-server.onrender.com/markethealers/auth/userLogedIn`,
        { userName, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        location.href = `https://server-guard-server.onrender.com/markethealers/auth/`;
      })
      .catch(() => {
        myAlert('error', 'Login failed');
      });
  } catch (err) {
    myAlert('error', err.message);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    login();
  }
});

function forgotPassword() {
  location.href = `https://server-guard-server.onrender.com/markethealers/auth/forgotPassword`;
}

function googleLoginButton(e) { e.preventDefault(); 
   location.href = `https://server-guard-server.onrender.com/markethealers/auth/auth/google` 
}
window.onload = function () {
  document.querySelector('input').focus();
};
