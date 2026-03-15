import "./style.css";


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
        fetchUserProfile()
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


// Profile fetching and token

const userSpan = document.querySelectorAll("#user-profile") as NodeListOf<HTMLElement>;
const userName = localStorage.getItem("user");
const token = localStorage.getItem("token");
const profilePopup = document.querySelector(".register-wrap") as HTMLElement;

if (userName && token) {
    userSpan.forEach((span) => {
        span.textContent = userName;
    });
} else {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    userSpan.forEach((span) => {
        span.textContent = "Sign in";
    });
}

async function fetchUserProfile() {
    if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
    }

    try {
        const response = await fetch("https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        })

        if (response.ok) {
                const result = await response.json()
                profilePopup.innerHTML = `
                <div class="register-head"> 
                    <h2>Profile</h2>
                    <button class="close-registration">&times;</button>
                </div>
                <div class="register-content">
                    <button class="sign-out-btn">Sign Out</button>
                    <p><strong>Name:</strong> ${result.data.name}</p>
                    <p><strong>Email:</strong> ${result.data.email}</p>
                    <p><strong>Login:</strong> ${result.data.login}</p>
                    <h3>Account Details</h3>
                </div>
                `
                localStorage.setItem("email", result.data.email);

                const closeProfileBtn = profilePopup.querySelector(".close-registration") as HTMLElement;
                closeProfileBtn.addEventListener("click", () => {
                    registrationPopup.classList.remove("active");
                    registrationOverlay.classList.remove("active");
                    document.body.style.overflow = "auto";
                })

                const signOutBtn = profilePopup.querySelector(".sign-out-btn") as HTMLElement;
                signOutBtn.addEventListener("click", () => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    userSpan.forEach((span) => {
                        span.textContent = "Sign in";
                    });
                    window.location.reload();
                })
            } else if (response.status === 401) {
                    alert("Session expired. Please sign in again.");
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    userSpan.forEach((span) => {
                        span.textContent = "Sign in";
                    });
                    registrationPopup.classList.remove("active");
                    registrationOverlay.classList.remove("active");
                    document.body.style.overflow = "auto";
                } else {
            console.error("Failed to fetch user profile:", response.statusText);
        }
    }
    catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

fetchUserProfile()





// Donation modals

const moneySelectBtn = document.querySelectorAll(".amount-card") as NodeListOf<HTMLElement>
const donationInputMoney = document.getElementById("donation-input") as HTMLInputElement;

moneySelectBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        donationInputMoney.value = btn.textContent?.replace(/\D/g, '') || '';
    })
})











// Donation Modal Selectors

const donationModal = document.getElementById("donate-modal") as HTMLElement;
const closeBtn = document.getElementById("close-donate-steps") as HTMLElement;
const donationForm = document.getElementById("donation-steps-form") as HTMLFormElement;

const openModalBtns = document.querySelectorAll(".live-header button, .donate-now1, .footer-button button, .donate-btn, .choose-btn, .text-content button, .care-card button, .choose-btn1");

const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const backBtn = document.getElementById("back-btn") as HTMLElement;
const steps = document.querySelectorAll<HTMLElement>(".form-step"); 
const dots = document.querySelectorAll<HTMLElement>(".dot");
const petSelect = document.querySelector("select[name='pet']") as HTMLSelectElement;
const nameInput = document.getElementById("name-donation") as HTMLInputElement;
const emailInput = document.getElementById("email-donation") as HTMLInputElement;
const creditCardInput = document.getElementById("creditcard-input") as HTMLInputElement;
const cvvInput = document.getElementById("cvv-input") as HTMLInputElement;
const creditCardContainer = document.getElementById("creditcard-container") as HTMLElement;
const monthSelect = document.getElementById("month-select") as HTMLSelectElement;
const yearSelect = document.getElementById("year-select") as HTMLSelectElement;

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
        validateStep()
        if (!nextBtn.disabled) {
            submitDonation();
        }
    }
});

backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
        currentStep--;
        updateFormUI();
    }
});

function saveDonationData() : void {
    localStorage.setItem("donationAmount", donationInputMoney.value);
    localStorage.setItem("selectedPet", petSelect.value);
}

function loadDonationData() : void {
    const savedAmount = localStorage.getItem("donationAmount");
    const savedPet = localStorage.getItem("selectedPet");
    if (savedAmount) {
        donationInputMoney.value = savedAmount;
    }
    if (savedPet) {
        petSelect.value = savedPet;
    }
}

function clearDonationData() : void {
    localStorage.removeItem("donationAmount");
    localStorage.removeItem("selectedPet");
    localStorage.removeItem("guest_name");
    localStorage.removeItem("guest_email");
    localStorage.removeItem("creditCard");
    localStorage.removeItem("cvv");
    localStorage.removeItem("expiryMonth");
}

function validateStep() {
    switch (currentStep) {
        case 1:
            const amount = parseFloat(donationInputMoney.value.trim());
            const selectPet = petSelect.value;

            const isAmountValid = !isNaN(amount) && amount > 0;
            const isPetSelected = selectPet !== "";

            const isValid = isAmountValid && isPetSelected;
            nextBtn.style.backgroundColor = isValid ? "#00A092" : "#80CFC8";
            nextBtn.disabled = !isValid;
            saveDonationData();
            break;

        case 2:
            const isUserLoggedIn = (userName && token)
            if (isUserLoggedIn) {
                nameInput.value = localStorage.getItem("user") || "";
                emailInput.value = localStorage.getItem("email") || "";

                nameInput.readOnly = true;
                emailInput.readOnly = true;
            } else {
                const nameRegex = /^[a-zA-Z\s]+$/
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                const isNameValid = nameRegex.test(nameInput.value.trim());
                const isEmailValid = emailRegex.test(emailInput.value.trim());

                nameInput.style.border = (nameInput.value.length === 0) ? "1px solid #ccc" : 
                                        (isNameValid ? "2px solid #00A092" : "2px solid #ff4d4d");

                emailInput.style.border = (emailInput.value.length === 0) ? "1px solid #ccc" : 
                                        (isEmailValid ? "2px solid #00A092" : "2px solid #ff4d4d");


                localStorage.setItem("guest_name", nameInput.value);
                localStorage.setItem("guest_email", emailInput.value);       

                const isValid = isNameValid && isEmailValid;
                nextBtn.style.backgroundColor = isValid ? "#00A092" : "#80CFC8";
                nextBtn.disabled = !isValid;
            }
            break;

            case 3:
                const cardNum = creditCardInput.value.replace(/\s/g, '');
                const cvv = cvvInput.value.trim();
                const month = monthSelect.value;
                const year = yearSelect.value;

                const cardNumValid = /^\d{16}$/.test(cardNum);
                const cvvValid = /^\d{3}$/.test(cvv);
                const isDateValid = month !== "Month" && year !== "Year";

                creditCardInput.style.border = (creditCardInput.value.length === 0) ? "1px solid #ccc" : 
                                                (cardNumValid ? "2px solid #00A092" : "2px solid #ff4d4d");
                
                cvvInput.style.border = (cvvInput.value.length === 0) ? "1px solid #ccc" : 
                                        (cvvValid ? "2px solid #00A092" : "2px solid #ff4d4d");
                
                monthSelect.style.border = (month === "Month") ? "1px solid #ccc" : 
                                           (isDateValid ? "2px solid #00A092" : "2px solid #ff4d4d");
                
                yearSelect.style.border = (year === "Year") ? "1px solid #ccc" : 
                                           (isDateValid ? "2px solid #00A092" : "2px solid #ff4d4d");

                const isFormValid = cardNumValid && cvvValid && isDateValid;
                nextBtn.style.backgroundColor = isFormValid ? "#F58021" : "#80CFC8";
                nextBtn.disabled = !isFormValid;
            break;
    }
}
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
    validateStep();
}

function resetForm() : void {
    currentStep = 1;
    if(donationForm) donationForm.reset();
    clearDonationData();
    updateFormUI();
}

const petNames: Record<string, string> = {
    1: "Lukas the Panda",
    2: "Andy the Lemur",
    3: "Glen the Gorilla",
    4: "Mike the Alligator",
    5: "Sam & Lora the Eagles",
    6: "Liz the Koala",
    8: "Shake the Lion"
}

async function submitDonation() : Promise<void> {
    const donationData = {
        name: localStorage.getItem("guest_name") || localStorage.getItem("user") || "",
        email: localStorage.getItem("guest_email") || localStorage.getItem("email") || "",
        amount: parseFloat(localStorage.getItem("donationAmount") || "0"),
        petId: parseInt(localStorage.getItem("selectedPet") || "0"),
    }

    nextBtn.innerText = "Processing...";
    nextBtn.disabled = true;

    try {
        const response = await fetch("https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/donations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donationData),
        });

        if (response.ok) {
            const petIdKey = donationData.petId.toString();
            const petName = petNames[petIdKey] || "the selected animal";
            alert(`Thank you for your donation of $${donationData.amount.toFixed(2)} to ${petName}!`);
            donationModal.classList.remove("active");
            document.body.style.overflow = "auto";
            resetForm();
        } else {
            const errorData = await response.json()
            alert(`Failed to submit donation: ${errorData.message || response.statusText}`);
            updateFormUI()
        }
        } catch (error) {
            console.log("Error submitting donation:", error);
            alert("Network error. Please check your connection and try again.");
            updateFormUI()
    }
}

const isUserLogged = (userName && token);

if (isUserLogged) {
    const saveCardCont = document.createElement("label");
    const saveCardCheckbox = document.createElement("input");
    const saveCardText = document.createTextNode("Save card for future donations");
    saveCardCheckbox.type = "checkbox";
    saveCardCheckbox.id = "save-card-checkbox";
    saveCardCont.appendChild(saveCardCheckbox);
    saveCardCont.appendChild(saveCardText);
    creditCardContainer.appendChild(saveCardCont);


    saveCardCheckbox.addEventListener("change", () => {
        if (saveCardCheckbox.checked) {
            localStorage.setItem("creditCard", creditCardInput.value);
            localStorage.setItem("cvv", cvvInput.value);
            localStorage.setItem("expiryMonth", `${monthSelect.value}/${yearSelect.value}`);
        } else {
            localStorage.removeItem("creditCard");
            localStorage.removeItem("cvv");
            localStorage.removeItem("expiryMonth");
        }
    });
}

nameInput.addEventListener("input", validateStep);
emailInput.addEventListener("input", validateStep);
donationInputMoney.addEventListener("input", validateStep);
petSelect.addEventListener("change", validateStep);
creditCardInput.addEventListener("input", validateStep);
cvvInput.addEventListener("input", validateStep);
monthSelect.addEventListener("change", validateStep);
yearSelect.addEventListener("change", validateStep);
loadDonationData();
updateFormUI();