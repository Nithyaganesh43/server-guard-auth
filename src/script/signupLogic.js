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

    const emailField = document.getElementById("email");
    const otpButton = document.getElementById("otpButton");
    email = emailField.value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    isRequestInProgress = true;
    otpButton.disabled = true;
    otpButton.innerText = "Requesting...";

    try {
        const response = await axios.post(`https://server.markethealers.com/markethealers/auth/auth/markethealers`, { email },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            });
        alert(response.data.message);

        document.getElementById('signupBOX').innerHTML = `
            <div class="group">
    <input required="" type="text" id="otp" class="input">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label for="otp">Enter Your 6-digit OTP</label>
</div> <br>
<div class="group">
    <button type="button" onclick="submitOTP()" class="button">Submit OTP</button>
</div>

        `;

        document.getElementById("otp").addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                submitOTP();
            }
        });

    } catch (error) {
        alert(error.response?.data?.message || "An error occurred. Please try again.");
        otpButton.disabled = false;
        otpButton.innerText = "Get OTP";
    } finally {
        isRequestInProgress = false;
    }
}
  document.getElementById('signupBOX').innerHTML = `
  <div class="group" >
    <input required="" type="text" id="otp" class="input">
    <span class="highlight"></span>
    <span class="bar"></span>
    <label for="otp">Enter Your 6-digit OTP</label>
    <button style="width:150px; left:20%" type="button" onclick="submitOTP()" class="button">Submit OTP</button>
</div>


        `;
function submitOTP() {
    const otp = document.getElementById("otp")?.value;

    if (!otp || otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }

    axios.post(`https://server.markethealers.com/markethealers/auth/auth/markethealers/verifyotp`, { otp },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
            alert(response.data.message);
            window.location.href = `https://server.markethealers.com/markethealers/auth/newUserInfo?email=${email}&platform=markethealers`;
        })
        .catch((error) => {
            alert(error.response?.data?.message || "Invalid OTP. Please try again.");
        });
}

document.getElementById("email").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getOTP();
    }
});
