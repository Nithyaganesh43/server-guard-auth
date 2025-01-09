async function login() {
    try {
        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;
        if (userName.length < 8 || password.length < 8) {
            alert("Username and password must be at least 8 characters");
            return;
        }
        await axios.post(`https://server.markethealers.com/markethealers/auth/userLogedIn`, { userName, password },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(() => {
                location.href = `https://server.markethealers.com/markethealers/auth/`;
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
    location.href = `https://server.markethealers.com/markethealers/auth/forgotPassword`;
}

function googleLoginButton() {
    window.location.href = `https://server.markethealers.com/markethealers/auth/auth/google`;
}

function githubLoginButton() {
    window.location.href = `https://server.markethealers.com/markethealers/auth/auth/github`;
}
