import {
    getCustomStyleProperty,
    setCustomStyleProperty,
    updateCustomStyleProperty,
} from "./helper.js";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

const gameWorld = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll("[data-cactus]").forEach((cactus) => {
        cactus.remove();
    });
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach((cactus) => {
        const newValue = delta * speedScale * SPEED * -1;
        updateCustomStyleProperty(cactus, "--cactus-left", newValue);

        if (getCustomStyleProperty(cactus, "--cactus-left") <= -100) {
            cactus.remove();
        }
    });

    if (nextCactusTime <= 0) {
        createCactus();
        nextCactusTime =
            randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
            speedScale;
    }

    nextCactusTime -= delta;
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map((cactus) => {
        return cactus.getBoundingClientRect();
    });
}

function createCactus() {
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = "./images/cactus.png";
    cactus.classList.add("cactus");
    setCustomStyleProperty(cactus, "--cactus-left", 100);
    gameWorld.append(cactus);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}