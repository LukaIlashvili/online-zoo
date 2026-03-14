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
setTimeout(() => {
    popup.classList.add("active")
    document.body.style.overflow = "hidden"
}, 2000)

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


// Pet grid carousel


const track = document.querySelector('.animal-care-grid') as HTMLElement;
const dots1 = document.querySelectorAll<HTMLElement>('.dot1');

track.addEventListener('scroll', () => {
    const firstVisibleCard : HTMLElement | null = track.querySelector('.care-card');
    const cardWidth = firstVisibleCard ? firstVisibleCard.offsetWidth : 0;
    
    const totalStep = cardWidth + 20; 
    
    const index = Math.round(track.scrollLeft / totalStep);
    
    dots1.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});



// review carousel

let currentReviewIndex = 0;

function initializeReviewSlider(totalReviews: number) {
    const reviewTrack = document.querySelector('.review-cards') as HTMLElement;
    const moveLeftBtn = document.querySelector('.arrow-navigation button:first-child') as HTMLElement;
    const moveRightBtn = document.querySelector('.arrow-navigation button:last-child') as HTMLElement;

    if (!reviewTrack || !moveLeftBtn || !moveRightBtn) return;

    // We add + 1 here to create that "empty space" press after the last card
    const totalSlots = totalReviews + 1; 

    function updateReviewPosition() {
        const firstCard = reviewTrack.firstElementChild as HTMLElement;
        if (!firstCard) return;

        // Get exact card width
        const cardWidth = firstCard.getBoundingClientRect().width;
        
        // Get the actual gap between cards from CSS
        const trackStyle = window.getComputedStyle(reviewTrack);
        const gap = parseFloat(trackStyle.columnGap) || 0;
        
        // The movement distance is exactly one card plus one gap
        const stepSize = cardWidth + gap;
        
        // Move the track
        reviewTrack.style.transform = `translateX(-${currentReviewIndex * stepSize}px)`;
    }

    moveRightBtn.onclick = () => {
        // Now loops back to 0 only after hitting the empty slot
        currentReviewIndex = (currentReviewIndex + 1) % totalSlots;
        updateReviewPosition();
    };

    moveLeftBtn.onclick = () => {
        currentReviewIndex = (currentReviewIndex - 1 + totalSlots) % totalSlots;
        updateReviewPosition();
    };

    window.addEventListener('resize', updateReviewPosition);
    updateReviewPosition();
}

initializeReviewSlider(24)


// pet carousel

document.addEventListener('DOMContentLoaded', () => {
    const finalPetGrid = document.querySelector('.pet-cards') as HTMLElement;
    const petControlButtons = document.querySelectorAll<HTMLButtonElement>('.pet-carousel-arrows button');

    if (!finalPetGrid || petControlButtons.length < 2) return;

    const moveBack = petControlButtons[0];
    const moveForward = petControlButtons[1];

    let currentIndex = 0;
    const totalPets = 28;

function updatePosition() {
        const firstCard = finalPetGrid.querySelector('.pet-card') as HTMLElement;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth; 
        const style = window.getComputedStyle(finalPetGrid);
        const gap = parseInt(style.columnGap) || 0;
        
        const cardStep = cardWidth + gap;

        finalPetGrid.style.transform = `translateX(-${currentIndex * cardStep}px)`;
    }

    moveForward.onclick = () => {
        currentIndex = (currentIndex + 1) % totalPets;
        updatePosition();
    };

    moveBack.onclick = () => {
        currentIndex = (currentIndex - 1 + totalPets) % totalPets;
        updatePosition();
    };

    window.onresize = updatePosition;
});

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
                const userMail = localStorage.setItem("email", result.data.email);

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

        } else {
            console.error("Failed to fetch user profile:", response.statusText);
        }
    }
    catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }


fetchUserProfile()
