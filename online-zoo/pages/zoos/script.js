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