const toggleBtn = document.querySelector(".toggle")
const navTabs = document.querySelector(".tabs")
const closeBtn1 = document.querySelector(".close-sidebar")
const navbar = document.querySelector(".navbar")
const popup = document.getElementById("popup1")
const closeBtn2 = document.getElementById("close-btn")

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


// Mobile navbar open and close
toggleBtn.addEventListener("click", () => {
    navTabs.classList.toggle("mobile-open")
    navbar.classList.add("menu-active")
})

closeBtn1.addEventListener("click", () => {
    navTabs.classList.remove("mobile-open")
    navbar.classList.remove("menu-active")
})