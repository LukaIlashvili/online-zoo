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

const reviewTrack = document.querySelector('.review-cards') as HTMLElement;
const reviewDots = document.querySelectorAll('.dot2');

reviewTrack.addEventListener('scroll', (e: Event): void => {
    const target = e.target as HTMLElement;
    const firstChild = target.firstElementChild as HTMLElement;
    const cardWidth: number = firstChild ? firstChild.offsetWidth : 0;
    const gap = 10;
    const scrollStep = cardWidth + gap;
    
    const index = Math.round(target.scrollLeft / scrollStep);
    
    reviewDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const reviewBox = document.querySelector('.review-cards') as HTMLElement;
    const moveLeftBtn = document.querySelector('.arrow-navigation button:first-child') as HTMLElement;
    const moveRightBtn = document.querySelector('.arrow-navigation button:last-child') as HTMLElement;

    if (reviewBox && moveLeftBtn && moveRightBtn) {
        

    moveRightBtn.onclick = function() {
        const reviewText = document.querySelector('.review-text') as HTMLElement; 
        const windowCenter = window.innerWidth / 2;
        const gridRect = reviewBox.getBoundingClientRect();
        const gridCenter = gridRect.width / 2;
        const distanceToCenter = windowCenter - gridCenter - gridRect.left;


        reviewBox.style.transform = `translateX(${distanceToCenter}px)`;
        

        reviewText.style.opacity = "0";
        reviewText.style.pointerEvents = "none"; 
    };

    moveLeftBtn.onclick = function() {
        const reviewText = document.querySelector('.review-text') as HTMLElement;
        reviewBox.style.transform = "translateX(0)";
        

        reviewText.style.opacity = "1";
        reviewText.style.pointerEvents = "auto";
    };
    }
});


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