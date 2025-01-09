async function login() {
    try {
        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;
        if (userName.length < 8 || password.length < 8) {
            alert("Username and password must be at least 8 characters");
            return;
        }
        await axios.post(`http://localhost:3000/markethealers/auth/userLogedIn`, { userName, password },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(() => {
                location.href = `http://localhost:3000/markethealers/auth/`;
            })
            .catch(() => {
                alert("Login failed");
            });
    } catch (err) {
        alert(err.message);
    }
}
 
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        login();
    }
});

function forgotPassword() {
    location.href = `http://localhost:3000/markethealers/auth/forgotPassword`;
}

function googleLoginButton() {
    window.location.href = `http://localhost:3000/markethealers/auth/auth/google`;
}

function githubLoginButton() {
    window.location.href = `http://localhost:3000/markethealers/auth/auth/github`;
}
