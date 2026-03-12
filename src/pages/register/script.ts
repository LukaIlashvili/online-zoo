import "./style.css";

const popup = document.getElementById("popup1") as HTMLElement;
const closeBtn2 = document.getElementById("close-btn") as HTMLElement;
const donationModal = document.getElementById("donate-modal") as HTMLElement;
const closeBtn = document.getElementById("close-donate-steps") as HTMLElement;
const donationForm = document.getElementById("donation-steps-form") as HTMLFormElement;


// Donation Modal Selectors

const openModalBtns = document.querySelectorAll(".live-header button, .donate-now1, .footer-button button, .donate-btn, .choose-btn, .text-content button, .care-card button, .choose-btn1");

const nextBtn = document.getElementById("next-btn") as HTMLElement;
const backBtn = document.getElementById("back-btn") as HTMLElement;
const steps = document.querySelectorAll<HTMLElement>(".form-step"); 
const dots = document.querySelectorAll<HTMLElement>(".dot");

let currentStep : number = 1;

openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        donationModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

closeBtn.addEventListener("click", () => {
    donationModal.classList.remove("active");
    document.body.style.overflow = "auto";
    resetForm();
});

donationModal.addEventListener("click", (e : MouseEvent) : void => {
    if (e.target === donationModal) {
        donationModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

nextBtn.addEventListener("click", () => {
    if (currentStep < 3) {
        currentStep++;
        updateFormUI();
    } else {
        console.log("donation processed");
        alert("Thanks for your donation!");
        donationModal.classList.remove("active");
        document.body.style.overflow = "auto";
        resetForm();
    }
});

backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
        currentStep--;
        updateFormUI();
    }
});

function updateFormUI() : void {
    steps.forEach((step : HTMLElement) => {
        const stepNum = parseInt(step.dataset.step || "0");
        step.classList.toggle("active", stepNum === currentStep);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", (index + 1) === currentStep);
    });

    backBtn.style.visibility = (currentStep === 1) ? "hidden" : "visible";

    if (currentStep === 3) {
        nextBtn.innerText = "COMPLETE DONATION";
        nextBtn.style.backgroundColor = "#F58021";
    } else {
        nextBtn.innerHTML = "NEXT &rarr;";
        nextBtn.style.backgroundColor = "#00A092";
    }
}

function resetForm() : void {
    currentStep = 1;
    if(donationForm) donationForm.reset();
    updateFormUI();
}

updateFormUI();


// popup configs
// setTimeout(() => {
//     popup.classList.add("active")
//     document.body.style.overflow = "hidden"
// }, 2000)

closeBtn2.addEventListener("click", () => {
    popup.classList.remove("active")
    document.body.style.overflow = "auto"
})

popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.remove("active")
        document.body.style.overflow = "auto"
    }
})

// Navbar Logic

const hamburger = document.querySelector(".toggle") as HTMLElement;
const closeNav = document.querySelector(".close-sidebar") as HTMLElement;
const sidebar = document.querySelector(".tabs") as HTMLElement;

hamburger.addEventListener("click", () => {
    sidebar.style.transform = "translateX(0)"
    hamburger.style.display = "none"
})

closeNav.addEventListener("click", () => {
    sidebar.style.transform = "translateX(-100%)"
    hamburger.style.display = "flex"
})

// REGISTRATION POPUPS

const userLogin = document.querySelectorAll(".user-trigger") as NodeListOf<HTMLElement>;
const registrationOverlay = document.querySelector(".overlay-registration") as HTMLElement;
const registrationPopup = document.getElementById("register-popup") as HTMLElement;
const closeRegistrationBtn = document.querySelector(".close-registration") as HTMLElement;



userLogin.forEach((btn) => {
    btn.addEventListener("click", () => {
        registrationOverlay.classList.add("active")
        registrationPopup.classList.add("active")
        document.body.style.overflow = "hidden"
})
})

closeRegistrationBtn.addEventListener("click", () => {
    registrationOverlay.classList.remove("active")
    registrationPopup.classList.remove("active")
    document.body.style.overflow = "auto"
})


registrationOverlay.addEventListener("click", () => {
    closeRegistrationBtn.click();
})

// login and sign up pages switch

function showSignUp() : void {
    const loginWrap = document.querySelector(".login-wrap") as HTMLElement;
        loginWrap.innerHTML = `
        <div class="login-text">
            <h2>Sign Up</h2>
        </div>
        <div class="login-inputs">
            <input type="text" name="login" id="login-form" minlength="3" maxlength="12" required placeholder="Enter login">
            <p id="login-hint" class="hint-text">3-12 chars, start with a letter (English only)</p>
            <input type="password" name="password" id="password-form" minlength="6" maxlength="20" required placeholder="Enter password">
            <p id="pass-hint" class="hint-text">Min 6 chars, include a special character</p>
            <input type="password" name="confirm-password" id="confirm-password-form" minlength="6" maxlength="20" required placeholder="Confirm password">
            <p id="confirm-pass-hint" class="hint-text">The two fields should match (case-sensitive).</p>
            <input type="text" name="name" id="name-form" required placeholder="Enter your name">
            <p id="name-hint" class="hint-text">3-12 chars, only English letters are allowed</p>
            <input type="email" name="email" id="email-form" required placeholder="Enter email">
            
            <button id="login-btn">Register</button> 
        </div>
            <div id="line"></div>
            <div class="login-desc">
                <p>Already have an account?</p> <button id="login-button">Log In</button>
            </div>
        </div>
            `

        const loginInput = document.getElementById("login-form") as HTMLInputElement;
        const passInput = document.getElementById("password-form") as HTMLInputElement;
        const confirmInput = document.getElementById("confirm-password-form") as HTMLInputElement;
        const nameInput = document.getElementById("name-form") as HTMLInputElement;
        const emailInput = document.getElementById("email-form") as HTMLInputElement;
        const registerBtn = document.getElementById("login-btn") as HTMLButtonElement;


        const validateSignUp = () => {
            const isLoginValid = /^[a-zA-Z][a-zA-Z0-9]{2,11}$/.test(loginInput.value);
            const isPassValid = /^(?=.*[!@#$%^&*])(?=.{6,})/.test(passInput.value);
            const isConfirmValid = confirmInput.value === passInput.value && passInput.value !== "";
            const isNameValid = /^[a-zA-Z\s]{3,11}$/.test(nameInput.value);
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);


            document.getElementById("login-hint")!.className = isLoginValid ? 'hint-text hint-success' : 'hint-text hint-error';
            document.getElementById("pass-hint")!.className = isPassValid ? 'hint-text hint-success' : 'hint-text hint-error';
            document.getElementById("confirm-pass-hint")!.className = isConfirmValid ? 'hint-text hint-success' : 'hint-text hint-error';
            document.getElementById("name-hint")!.className = isNameValid ? 'hint-text hint-success' : 'hint-text hint-error';


            if (isLoginValid && isPassValid && isConfirmValid && isNameValid && isEmailValid) {
                registerBtn.classList.add('active-button');
            } else {
                registerBtn.classList.remove('active-button');
            }
        };


        [loginInput, passInput, confirmInput, nameInput, emailInput].forEach(el => {
            el.addEventListener('input', validateSignUp);
        });

        registerBtn.addEventListener("click", () => {
            if (registerBtn.classList.contains('active-button')) {
                handleRegisterRequest();
            }
        });

        const loginBtn = document.getElementById("login-button") as HTMLElement;
        loginBtn.addEventListener("click", () => {
            showLogin();
        });
}

function showLogin() : void {
    const loginWrap = document.querySelector(".login-wrap") as HTMLElement;
    loginWrap.innerHTML = `
                    <div class="login-text">
                        <h2>Log In</h2>
                    </div>
                    <div class="login-inputs">
                        <input type="text" name="login" id="login-form" minlength="3" maxlength="12" required placeholder="Enter login">
                        <!-- <p id="login-hint" class="hint-text">3-12 chars, start with a letter (English only)</p> -->
                        
                        <input type="password" name="password" id="password-form" minlength="6" maxlength="20" required placeholder="Enter password">
                        <!-- <p id="pass-hint" class="hint-text">Min 6 chars, include a special character</p> -->
                        
                        <button id="login-btn">Log In</button>
                    </div>
                    <div id="line"></div>
                    <div class="login-desc">
                        <p>Not a member yet?</p> <button id="register-button">Sign Up</button>
                    </div>
    `

    const loginInput = document.getElementById("login-form") as HTMLInputElement;
    const passwordInput = document.getElementById("password-form") as HTMLInputElement;
    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;

    setupLoginValidation(loginInput, passwordInput, loginBtn);


    const signUpBtn = document.getElementById("register-button") as HTMLElement;
    signUpBtn.addEventListener("click", () => {
        showSignUp();
    });
}

// Initial Log in page

const initialSignUpBtn = document.getElementById("register-button") as HTMLElement;
initialSignUpBtn.addEventListener("click", () => {
    showSignUp();
});

const initialLoginInput = document.getElementById("login-form") as HTMLInputElement;
const initialPasswordInput = document.getElementById("password-form") as HTMLInputElement;
const initialLoginBtn = document.getElementById("login-btn") as HTMLElement;

if (initialLoginInput) {
    setupLoginValidation(initialLoginInput as HTMLInputElement, initialPasswordInput as HTMLInputElement, initialLoginBtn as HTMLButtonElement);
}

// Api registration and login 


async function handleRegisterRequest() {
    const registerBtn = document.getElementById("login-btn") as HTMLButtonElement;

    registerBtn.disabled = true;
    registerBtn.innerHTML = `<span class="spinner"></span> Registering...`;

    // Collect the data directly from the input fields
    const userData = {
        login: (document.getElementById("login-form") as HTMLInputElement).value,
        password: (document.getElementById("password-form") as HTMLInputElement).value,
        name: (document.getElementById("name-form") as HTMLInputElement).value,
        email: (document.getElementById("email-form") as HTMLInputElement).value
    };

    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registration Successful! Please Log In.");
            showLogin(); // Automatically send them to the login screen
        } else {
            alert("Error: " + (result.error || "Something went wrong"));
            registerBtn.disabled = false;
            registerBtn.innerText = "Register";
        }
    } catch (error) {
        alert("Server is down. Please try again later.");
        registerBtn.disabled = false;
        registerBtn.innerText = "Register";
    }
}


async function handleLoginRequest() {
    const loginInput = document.getElementById("login-form") as HTMLInputElement;
    const passwordInput = document.getElementById("password-form") as HTMLInputElement;
    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;

    loginBtn.disabled = true;
    loginBtn.innerHTML = `<span class="spinner"></span> Logging In...`;

    const credentials = {
        login: loginInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch("https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })

        const result = await response.json();

        if (response.ok) {
            const { access_token, user } = result.data
            alert(`Login Successfull! ${user.name}, welcome back!`);
            localStorage.setItem("token", access_token);
            localStorage.setItem("user", user.name);
            window.location.href = "/index.html";
        } else {
            alert("Login Failed: " + (result.error || "Invalid credentials"));
            loginBtn.disabled = false;
            loginBtn.innerText = "Log In";
        } 
    } catch (error) {
        alert("Server is down. Please try again later.");
        loginBtn.disabled = false;
        loginBtn.innerText = "Log In";
    }
}


function setupLoginValidation(loginInput: HTMLInputElement, passwordInput: HTMLInputElement, loginBtn: HTMLButtonElement) {
    const validate = () => {
        const isLoginValid = loginInput.value.length >= 3;
        const isPasswordValid = passwordInput.value.length >= 6;

        if (isLoginValid && isPasswordValid) {
            loginBtn.classList.add('active-button');
        } else {
            loginBtn.classList.remove('active-button');
        }
    }

    [loginInput, passwordInput].forEach(el => el.addEventListener('input', validate));
    loginBtn.addEventListener("click", () => {
        if (loginBtn.classList.contains('active-button')) {
            handleLoginRequest();
        }
    });
}