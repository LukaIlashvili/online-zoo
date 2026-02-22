const toggleBtn = document.querySelector(".toggle")
const navTabs = document.querySelector(".tabs")
const closeBtn1 = document.querySelector(".close-sidebar")
const navbar = document.querySelector(".navbar")
const popup = document.getElementById("popup1")
const closeBtn2 = document.getElementById("close-btn")
const donationModal = document.getElementById("donate-modal")
const openModalBtn = document.getElementById("donate-popup-btn")
const closeBtn = document.getElementById("close-donate-steps")
const donationForm = document.getElementById("donation-steps-form")
const grid = document.querySelector(".grid-pets")
const nextArr = document.querySelector(".pet-card-carousel button:nth-child(2)")
const prevArr = document.querySelector(".pet-card-carousel button:nth-child(1)")
const reviewsSection = document.querySelector("#reviews")
const nextBtn1 = document.querySelector(".review-btns button:last-child")
const prevBtn1 = document.querySelector(".review-btns button:first-child")

nextBtn1.addEventListener("click", () => {
    reviewsSection.classList.add("active-carousel")
})

prevBtn1.addEventListener("click", () => {
    reviewsSection.classList.remove("active-carousel")
})

let currentPosition = 0
const scrollStep = 220

nextArr.addEventListener("click", () => {
    if (currentPosition =! 0) {
        currentPosition = 0
        grid.style.transform = `translateX(${currentPosition}px)`
    }
})

prevArr.addEventListener("click", () => {
    if (currentPosition == 0) {
        currentPosition += scrollStep
        grid.style.transform = `translateX(${currentPosition}px)`
    }
})

const nextBtn = document.getElementById("next-btn")
const backBtn = document.getElementById("back-btn")
const steps = document.querySelectorAll(".form-step")
const dots = document.querySelectorAll(".dot")

let currentStep = 1

openModalBtn.addEventListener("click", () => {
    donationModal.classList.add("active")
    document.body.style.overflow = "hidden"
})

closeBtn.addEventListener("click", () => {
    donationModal.classList.remove("active")
    document.body.style.overflow = "auto"
    resetForm()
})

donationModal.addEventListener("click", (e) => {
    if (e.target === donationModal) {
        donationModal.classList.remove("active")
        document.body.style.overflow = "auto"
    }
})

nextBtn.addEventListener("click", () => {
    if (currentStep < 3) {
        currentStep++
        updateFormUI()
    } else {
        console.log("donation processed")
        alert("Thanks for your donation!")
        donationModal.classList.remove("active")
        resetForm()
    }
})

backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
        currentStep--
        updateFormUI()
    }
})

function updateFormUI() {
    steps.forEach(step => {
        step.classList.toggle("active", parseInt(step.dataset.step) === currentStep)
    })

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", (index + 1) === currentStep)
    })

    backBtn.style.visibility = (currentStep === 1) ? "hidden" : "visible"

    if (currentStep === 3) {
        nextBtn.innerText = "COMPLETE DONATION"
        nextBtn.style.backgroundColor = "#F58021"
    } else {
        nextBtn.innerHTML = "NEXT &rarr;"
        nextBtn.style.backgroundColor = "#00A092"
    }
}

function resetForm() {
    currentStep = 1
    donationForm.reset()
    updateFormUI()
}

updateFormUI()


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


// Mobile navbar open and close
toggleBtn.addEventListener("click", () => {
    navTabs.classList.toggle("mobile-open")
    navbar.classList.add("menu-active")
})

closeBtn1.addEventListener("click", () => {
    navTabs.classList.remove("mobile-open")
    navbar.classList.remove("menu-active")
})