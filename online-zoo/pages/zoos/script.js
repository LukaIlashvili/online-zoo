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


// Sidebar

const menu = document.getElementById('menu');
const toggleBtn = document.querySelector('.menu-toggle');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('menu-open');

    if (menu.classList.contains('menu-open')) {
        toggleBtn.innerHTML = '&laquo;';
    } else {
        toggleBtn.innerHTML = '&raquo;';
    }
});