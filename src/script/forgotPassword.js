let email;
let operation = "getotp";

document.addEventListener("keydown", (e) => {
    const inputBox = document.querySelector("input:focus");
    const button = document.getElementById("butt");
   
    if (e.key === "Enter") {
        switch (operation) {
            case "getotp":
                button?.click();
                break;
            case "submit":
                button?.click();
                break;
            case "reset":
                document.getElementById("reset")?.click();
                break;
        }
    }
});

function butt(opt) {
    if (opt) {
        document.getElementById("butt").disabled = true;
    } else {
        setTimeout(() => {
            document.getElementById("butt").disabled = false;
        }, 50000);
    }
}

async function getOTP() {
    email = document.getElementById("email").value;
    window.localStorage.setItem("email", email); 
    await axios.post(`https://server.markethealers.com/markethealers/auth/forgotPasswordGetOtp`, { email },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            alert(response.data.message);
            operation = "submit";
           
document.getElementById('box').innerHTML = `
<h2>Otp sent to ${email}</h2>
<h3>Kindly check your inbox or spam</h3>
<div class="group">
    <input required="" type="text" id="otp" class="input">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label for="otp">Enter Your 6-digit OTP</label>
</div>
<div class="group">
    <button type="button" onclick="submitOTP()" id="butt">Submit OTP</button>
</div>

`;
        
        })
        .catch(error => {
            if (error.response.data.message === "Email not found pls SignUp") {
                alert(error.response.data.message);
                window.location.href = `https://server.markethealers.com/markethealers/auth/signup`;
            } 
            else  if (error.response.data.message) {
                alert(error.response.data.message);
                window.location.href = `https://server.markethealers.com/markethealers/auth/signup`;
            } 
            else{ 
                alert("Unknown error");
            }
        });
}

async function submitOTP() {
    const otp = document.getElementById("otp").value;
    if (otp.length !== 6 || isNaN(otp)) {
        alert("Please enter a valid OTP.");
        return;
    }
    
    email = window.localStorage.getItem("email"); 
    await axios.post(`https://server.markethealers.com/markethealers/auth/forgotPasswordVerifyOtp`, { otp, email },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            alert(response.data.message);
            operation = "reset";
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
        <button type="button" onclick="resetPassword()" id="reset">Reset Password</button>
    </div>
</form>

            `;
            window.localStorage.setItem("email", "");
        })
        .catch(error => {
            let swe = error.response.data.message || error.response || error;
         
            alert(swe);
        });
}

function googleLoginButton() {
    window.location.href = `https://server.markethealers.com/markethealers/auth/auth/google`;
}

function githubLoginButton() {
    window.location.href = `https://server.markethealers.com/markethealers/auth/auth/github`;
}

async function resetPassword() {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    await axios.post(`https://server.markethealers.com/markethealers/auth/resetPassword`, { password: newPassword },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            alert(response.data.message);
            window.location.href = `https://server.markethealers.com/markethealers/auth/`;
        })
        .catch(error => {
            alert(error.response.data.message);
        });
}
