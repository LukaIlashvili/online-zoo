const popup = document.getElementById("popup1")
const closeBtn2 = document.getElementById("close-btn")
const donationModal = document.getElementById("donate-modal")
const openModalBtn = document.getElementById("donate-popup-btn")
const closeBtn = document.getElementById("close-donate-steps")
const donationForm = document.getElementById("donation-steps-form")
const grid = document.querySelector(".grid-pets")
const nextArr = document.querySelector(".pet-card-carousel button:nth-child(2)")
const prevArr = document.querySelector(".pet-card-carousel button:nth-child(1)")

// Donation Modal Selectors

const openModalBtns = document.querySelectorAll(".live-header button, .donate-now1, .footer-button button, .donate-btn, .choose-btn, .text-content button, .care-card button, .choose-btn1");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const steps = document.querySelectorAll(".form-step");
const dots = document.querySelectorAll(".dot");

let currentStep = 1;

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


// Pet grid carousel


const track = document.querySelector('.animal-care-grid');
const dots1 = document.querySelectorAll('.dot1');

track.addEventListener('scroll', () => {
    const firstVisibleCard = track.querySelector('.care-card');
    const cardWidth = firstVisibleCard.offsetWidth;
    
    const totalStep = cardWidth + 20; 
    
    const index = Math.round(track.scrollLeft / totalStep);
    
    dots1.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});



// review carousel

const reviewTrack = document.querySelector('.review-cards');
const reviewDots = document.querySelectorAll('.dot2');

reviewTrack.addEventListener('scroll', () => {
    const cardWidth = reviewTrack.firstElementChild.offsetWidth;
    const gap = 10;
    const scrollStep = cardWidth + gap;
    
    const index = Math.round(reviewTrack.scrollLeft / scrollStep);
    
    reviewDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const reviewBox = document.querySelector('.review-cards');
    const moveLeftBtn = document.querySelector('.arrow-navigation button:first-child');
    const moveRightBtn = document.querySelector('.arrow-navigation button:last-child');

    if (reviewBox && moveLeftBtn && moveRightBtn) {
        

    moveRightBtn.onclick = function() {
        const reviewText = document.querySelector('.review-text'); 
        const windowCenter = window.innerWidth / 2;
        const gridRect = reviewBox.getBoundingClientRect();
        const gridCenter = gridRect.width / 2;
        const distanceToCenter = windowCenter - gridCenter - gridRect.left;


        reviewBox.style.transform = `translateX(${distanceToCenter}px)`;
        

        reviewText.style.opacity = "0";
        reviewText.style.pointerEvents = "none"; 
    };

    moveLeftBtn.onclick = function() {
        const reviewText = document.querySelector('.review-text');
        reviewBox.style.transform = "translateX(0)";
        

        reviewText.style.opacity = "1";
        reviewText.style.pointerEvents = "auto";
    };
    }
});


// pet carousel

document.addEventListener('DOMContentLoaded', () => {
    const finalPetGrid = document.querySelector('.pet-cards');
    const petControlButtons = document.querySelectorAll('.pet-carousel-arrows button');

    const moveBack = petControlButtons[0];
    const moveForward = petControlButtons[1];

    moveForward.onclick = () => {
        const gridRect = finalPetGrid.getBoundingClientRect();
        const screenW = window.innerWidth;
        
        const overflowDistance = gridRect.width - screenW;

        if (overflowDistance > 0) {
            finalPetGrid.style.transform = `translateX(-${overflowDistance + 40}px)`;
        }
    };

    moveBack.onclick = () => {
        if (window.innerWidth <= 1200) {
            finalPetGrid.style.transform = "translateX(0)";
        } else {
            finalPetGrid.style.transform = "translateX(10%)";
        }
    };
});