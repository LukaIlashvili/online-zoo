import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sidebar

const menu = document.getElementById('menu') as HTMLElement;
const toggleBtn = document.querySelector('.menu-toggle') as HTMLElement;

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('menu-open');

    if (menu.classList.contains('menu-open')) {
        toggleBtn.innerHTML = '&laquo;';
    } else {
        toggleBtn.innerHTML = '&raquo;';
    }
});


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
    closeMapBtn.click();
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

const openModalBtns = document.querySelectorAll(".live-header button, .donate-now1, .footer-button button, .donate-btn, .choose-btn, .text-content button, .care-card button, .choose-btn1, .donate-now") as NodeListOf<HTMLElement>;

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



// Zoos logic

// sidebar

const petIcons: Record<number, string> = {
    1: "Panda", // Removed /public
    2: "Lemur", // Removed /public
    3: "Gorilla", // Removed /public
    4: "Eagle" // Removed /public
}

const petFiles: Record<number, string> = {
    1: "pandazoo",
    2: "lemurstats",
    3: "gorillastats",
    4: "eaglestats"
}

const liveData: Record<number, { title: string; videoUrl: string; thumb: string; cams: string[] }> = {
    1: { 
        title: "LIVE PANDA CAMS", 
        videoUrl: "https://www.youtube.com/watch?v=3szkFHfr6sA", 
        thumb: "/assets/images/pandacam.png",
        cams: ["smallpcam1.png", "smallpcam2.png", "smallpcam3.png"] 
    },
    2: { 
        title: "LIVE LEMUR CAMS", 
        videoUrl: "https://youtu.be/yYXoCHLqr4o?si=Q7wyUNTBw_FtK2Es", 
        thumb: "/assets/icons/lemuryt.png",
        cams: ["lemurcam1.png", "lemurcam2.png", "lemurcam3.png"] 
    },
    3: { 
        title: "LIVE GORILLA CAMS", 
        videoUrl: "https://youtu.be/GlOQnsVOa2o?si=kx2OSpU4rRlEwGHG", 
        thumb: "/assets/icons/gorillayt.png",
        cams: ["gorrilacam1.png", "gorilllacam2.png", "gorillacam3.png"] 
    },
    4: { 
        title: "LIVE EAGLE CAMS", 
        videoUrl: "https://youtu.be/hecXupPpE9o?si=IoUsZ95PXO6EgByg", 
        thumb: "/assets/icons/eagleyt.png",
        cams: ["eaglecam1.png", "eaglecam2.png", "eaglecam3.png"] 
    }
};

async function loadSidebarCameras() {
    const navContainer = document.querySelector(".animal-nav") as HTMLElement;
    if (!navContainer) return;

    try {
        const response = await fetch("https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/cameras");
        const { data } = await response.json();

        const allowedIds = [1, 2, 3, 4];
        const filteredData = data.filter((cam: any) => allowedIds.includes(cam.id));

        navContainer.innerHTML = filteredData.map((cam: any) => {
            return `
            <div class="line"></div>
            <a href="" data-id = "${cam.id}" class="animal-link">
                <div class="animal-icon">
                    <div class="circle">
                        <img class="starter" src="/assets/icons/${petIcons[cam.id]}.png" alt="icon">
                    </div>
                    <img class="opened" src="/assets/icons/${petIcons[cam.id]}1.png" alt="icon">
                    <p>${cam.text}</p>
                </div>
            </a>
            `;
        }).join("");

    } catch (error) {
        console.error("API failed:", error);
    }
}

// At the bottom of your script, initialize with a loading state
setStatus("Initializing zoo data...");

loadSidebarCameras().then(() => {
    // Once sidebar loads, we are ready
    setStatus(""); 
}).catch(() => {
    setStatus("Failed to load sidebar. Please refresh.", true);
});

async function updateAnimalStats(petId: number) {
    setStatus("Loading animal stats...");

    try {
        const response = await fetch(`https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${petId}`)
        const { data } = await response.json();

        const statsContainer = document.querySelector(".animal-stats .stats") as HTMLElement;
        const spans = statsContainer.querySelectorAll("span") as NodeListOf<HTMLElement>;
        const didYouKnow = document.getElementById("didyouknowP") as HTMLElement;

        if (didYouKnow) didYouKnow.textContent = data.description;

        if (spans) {
            spans[0].textContent = data.commonName;
            spans[1].textContent = data.scientificName;
            spans[2].textContent = data.type
            spans[3].textContent = data.size
            spans[4].textContent = data.diet
            spans[5].textContent = data.habitat
            spans[6].textContent = data.range
        }

        const desc = document.querySelector(".animal-description p") as HTMLElement;
        if (desc) {
            desc.textContent = data.detailedDescription;
        }

        const img = document.querySelector(".animal-pic img") as HTMLImageElement;
        if (img) img.src = `/assets/images/${petFiles[petId]}.png`;
        setStatus("");

        const lat = parseCoordinate(data.latitude);
        const lng = parseCoordinate(data.longitude);
        updateMapMarker(lat, lng);


    } catch (error) {
        setStatus("Failed to load animal stats.", true);
    }
}

updateAnimalStats(1);
loadSidebarCameras()

const navContainer = document.querySelector(".animal-nav");

navContainer?.addEventListener("click", (event) => {
    // Look for the clicked element's parent that has the 'sidebar-link' class
    const target = (event.target as HTMLElement).closest(".animal-link");
    
    if (target) {
        event.preventDefault(); // Stop the browser from following the href
        const petId = target.getAttribute("data-id");
        
        if (petId) {
            // Convert to number and call your stats function
            updateAnimalStats(Number(petId));
            updateLiveSection(Number(petId));
        }
    }
});


function updateLiveSection(petId: number) {
    const data = liveData[petId];
    if (!data) return;

    // Update Header
    const header = document.querySelector(".live-header h2");
    if (header) header.textContent = data.title;

    // Update Main Video Link
    const link = document.querySelector("#live a") as HTMLAnchorElement;
    if (link) link.href = data.videoUrl;

    // Update Main Video Image
    const mainImg = document.querySelector(".video img") as HTMLImageElement;
    if (mainImg) mainImg.src = data.thumb;

    // Update Small Cams (The gallery)
    const smallCams = document.querySelectorAll(".other-cams-align img");
    data.cams.forEach((camFile, index) => {
        if (smallCams[index]) {
            (smallCams[index] as HTMLImageElement).src = `/assets/icons/${camFile}`;
        }
    });
}

function setStatus(message: string, isError: boolean = false) {
    const statusDiv = document.getElementById("status-message") as HTMLElement;
    const contentSections = document.querySelectorAll("#animal-stats, #live");
    
    if (message) {
        statusDiv.textContent = message;
        statusDiv.style.display = "block";
        statusDiv.style.color = isError ? "red" : "white";
        // Hide actual content while loading/error
        contentSections.forEach(s => (s as HTMLElement).style.opacity = "0.3");
    } else {
        statusDiv.style.display = "none";
        contentSections.forEach(s => (s as HTMLElement).style.opacity = "1");
    }
}

// map popup logic


const openMap = document.getElementById("map-button") as HTMLElement;
const mapPopup = document.querySelector(".map-popup") as HTMLElement;
const closeMapBtn = document.querySelector(".close-map") as HTMLElement;
let map: any = null;

// Call this once on page load to set up the Leaflet object
function initMap() {
    map = L.map('map-id').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

// Define a variable to hold your active marker globally
let currentMarker: any = null;

function updateMapMarker(lat: number, lng: number) {
    if (!map) return;

    // 1. Remove the old marker if it exists
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // 2. Add the new marker at the new coordinates
    currentMarker = L.marker([lat, lng]).addTo(map);

    // 3. Optional: Add a popup so users know what they are looking at
    currentMarker.bindPopup("Habitat Location").openPopup();

    // 4. Smoothly move the map view to the new marker
    map.flyTo([lat, lng], 8); 
}

function parseCoordinate(coordString: string): number {
    // 1. Remove everything except numbers, dots, and minus signs
    const cleaned = coordString.replace(/[^0-9.-]/g, '');
    
    // 2. Convert to a standard number
    let val = parseFloat(cleaned);
    
    // 3. Handle S (South) and W (West) directions, which should be negative
    if (coordString.includes('S') || coordString.includes('W')) {
        val = val * -1;
    }
    
    return val;
}

// Ensure initMap is called at least once before the click listener triggers
document.addEventListener("DOMContentLoaded", () => {
    initMap();
});

openMap.addEventListener("click", () => {
    mapPopup.style.visibility = "visible";
    mapPopup.style.opacity = "1";
    document.body.style.overflow = "hidden";
    mapPopup.style.pointerEvents = "auto";
    registrationOverlay.classList.add("active");

    if (map) {
        map.invalidateSize();
    }
})

closeMapBtn.addEventListener("click", () => {
    mapPopup.style.visibility = "hidden";
    mapPopup.style.opacity = "0";
    document.body.style.overflow = "auto";
    mapPopup.style.pointerEvents = "none";
    registrationOverlay.classList.remove("active");
})









