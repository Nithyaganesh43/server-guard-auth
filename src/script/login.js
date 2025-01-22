function myAlert( icon, title) {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: icon,
    title: title,
    timer: 3000,
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

// myAlert("error", 'warning', 'hello world'); // error , success

async function login() {
  try {
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    if (userName.length < 8 || password.length < 8) {
       myAlert("error", 'Username and password must be at least 8 characters');
      return;
    }
    await axios
      .post(
        `https://server.markethealers.com/markethealers/auth/userLogedIn`,
        { userName, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        location.href = `https://server.markethealers.com/markethealers/auth/`;
      })
      .catch(() => {
         myAlert("error", 'Login failed');
      });
  } catch (err) {
     myAlert("error", err.message);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    login();
  }
});

function forgotPassword() {
  location.href = `https://server.markethealers.com/markethealers/auth/forgotPassword`;
}

function googleLoginButton() {
  window.location.href = `https://server.markethealers.com/markethealers/auth/auth/google`;
}

function githubLoginButton() {
  window.location.href = `https://server.markethealers.com/markethealers/auth/auth/github`;
}
