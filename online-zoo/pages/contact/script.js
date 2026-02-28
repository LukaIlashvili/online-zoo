// Navbar Logic

const hamburger = document.querySelector(".toggle")
const closeNav = document.querySelector(".close-sidebar")
const sidebar = document.querySelector(".tabs")

hamburger.addEventListener("click", () => {
    sidebar.style.transform = "translateX(0)"
    hamburger.style.display = "none"
})

closeNav.addEventListener("click", () => {
    sidebar.style.transform = "translateX(-100%)"
    hamburger.style.display = "flex"
})


// Donation Modal

// Donation Modal Selectors
const donationModal = document.getElementById("donate-modal");
const closeBtn = document.getElementById("close-donate-steps");
const donationForm = document.getElementById("donation-steps-form");

// Select ALL donation buttons (Live Header, Middle Page, Footer)
const openModalBtns = document.querySelectorAll(".live-header button, .donate-now, .donate-now1, .footer-button button, .donate-btn");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const steps = document.querySelectorAll(".form-step");
const dots = document.querySelectorAll(".dot");

let currentStep = 1;

// Loop through all found buttons and add the listener
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

donationModal.addEventListener("click", (e) => {
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
        document.body.style.overflow = "auto"; // Don't forget to restore scroll!
        resetForm();
    }
});

backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
        currentStep--;
        updateFormUI();
    }
});

function updateFormUI() {
    steps.forEach(step => {
        step.classList.toggle("active", parseInt(step.dataset.step) === currentStep);
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

function resetForm() {
    currentStep = 1;
    if(donationForm) donationForm.reset();
    updateFormUI();
}

updateFormUI();