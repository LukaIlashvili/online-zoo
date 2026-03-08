import "./types";
import petImages from "./constants";
import type { Feedback, Pet } from "./types";


async function getAnimals(): Promise<void> {
    const container = document.querySelector(".pet-carousel-text") as HTMLElement;
    const arrowNav = document.querySelector(".pet-carousel-arrows") as HTMLElement;
    const finalPetGrid = document.querySelector('.pet-cards') as HTMLElement;

    finalPetGrid.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
        </div>
    `;

    try {
        console.log('Fetching animals...');
        const response = await fetch("https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets");

        if (!response.ok) {
            throw new Error("Something went wrong. Please, refresh the page");
        }

        const result: { data: Pet[] } = await response.json();
        const pets: Pet[] = result.data;

        finalPetGrid.innerHTML = "";

        pets.forEach((pet: Pet) => {
            const petCard = document.createElement("div");

            petCard.className = "pet-card";
            petCard.innerHTML = `
                <div class='pet-tag'>${pet.name}</div>
                <div class='pet-image'>
                    <img src="${petImages[pet.id]}" alt="${pet.commonName}" loading="lazy">
                </div>
                <div class='pet-desc'>
                    <div class='pet-desc-text'>
                        <h3>${pet.commonName}</h3>
                        <p>${pet.description}</p>
                    </div>
                    <button>VIEW LIVE CAM &rarr;</button>
                </div>
                
            `;
            document.querySelector(".pet-cards")?.appendChild(petCard);
        });
    } catch (error) {
        container.innerHTML = `<p class="error-message">${(error as Error).message}</p>`;
        arrowNav.style.display = "none";

    }
}

async function getReviews(): Promise<void> {
    const container = document.querySelector(".review-wrap") as HTMLElement;
    const arrows = document.querySelector(".arrow-navigation") as HTMLElement;


    try {
        console.log('Fetching reviews...');
        const response = await fetch("https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback");

        if (!response.ok) {
            throw new Error("Something went wrong. Please, refresh the page");
        }

        const Result: { data: Feedback[] } = await response.json();
        const reviews: Feedback[] = Result.data;

        console.log('Reviews fetched:', reviews[0]?.name);
    } catch (error) {
        console.log("error", (error as Error).message);
        container.innerHTML = `<p class="error-message">${(error as Error).message}</p>`;
        arrows.style.display = "none";
    }
}

getAnimals()
getReviews()





