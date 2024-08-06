import { setupGround, updateGround } from "./ground.js";
import { setupDino, updateDino, getDinoRects, setDinoLose } from "./dino.js";
import { setupCactus, updateCactus, getCactusRects } from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREMENT = 0.00001;

const gameWorld = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const startScreenElement = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime = null;
let speedScale = 1;
let score = 0;

function update(time) {
    if (lastTime === null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }

    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);

    if (checkLose()) {
        return handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkLose() {
    const dinoRect = getDinoRects();
    return getCactusRects().some((cactusRect) =>
        isCollision(cactusRect, dinoRect)
    );
}

function isCollision(cactus, dino) {
    return (
        cactus.left < dino.right &&
        cactus.top < dino.bottom &&
        cactus.right > dino.left &&
        cactus.bottom > dino.top
    );
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREMENT;
}

function updateScore(delta) {
    score += delta * 0.01;
    scoreElement.textContent = Math.floor(score);
}

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElement.classList.add("hide");
    window.requestAnimationFrame(update);
}

function handleLose() {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true });
        startScreenElement.classList.remove("hide");
        startScreenElement.textContent = "Press Any Key To Restart";
    }, 100);
}

function setPixelToWorldScale() {
    let worldToPixelScale;

    const windowRatio = window.innerWidth / window.innerHeight;
    const worldRatio = WORLD_WIDTH / WORLD_HEIGHT;

    windowRatio < worldRatio
        ? (worldToPixelScale = window.innerWidth / WORLD_WIDTH)
        : (worldToPixelScale = window.innerHeight / WORLD_HEIGHT);

    const calculatedWorldWidthInPixel = WORLD_WIDTH * worldToPixelScale;
    const calculatedWorldHeightInPixel = WORLD_HEIGHT * worldToPixelScale;

    gameWorld.style.width = String(calculatedWorldWidthInPixel / 16) + "rem";
    gameWorld.style.height = String(calculatedWorldHeightInPixel / 16) + "rem";
}