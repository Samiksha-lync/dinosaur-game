import {
    getCustomStyleProperty,
    setCustomStyleProperty,
    updateCustomStyleProperty,
} from "./helper.js";

const dinoElement = document.querySelector("[data-dino]");

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isDinoJumping;
let dinoFrame;
let currentFrameTime;
let YVelocity;

export function setupDino() {
    isDinoJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    YVelocity = 0;
    setCustomStyleProperty(dinoElement, "--dino-bottom", 0);

    document.removeEventListener("keydown", onDinoJump);
    document.addEventListener("keydown", onDinoJump);
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRects() {
    return dinoElement.getBoundingClientRect();
}

export function setDinoLose() {
    dinoElement.src = "./images/dinoLose.png";
}

function handleRun(delta, speedScale) {
    if (isDinoJumping) {
        dinoElement.src = "./images/dinoStationary.png";
        return;
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;

        if (dinoFrame === 0) {
            dinoElement.src = "./images/dinoRunZero.png";
        } else if (dinoFrame === 1) {
            dinoElement.src = "./images/dinoRunOne.png";
        }

        currentFrameTime -= FRAME_TIME;
    }

    currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if (!isDinoJumping) {
        return;
    }

    updateCustomStyleProperty(dinoElement, "--dino-bottom", YVelocity * delta);

    if (getCustomStyleProperty(dinoElement, "--dino-bottom") <= 0) {
        setCustomStyleProperty(dinoElement, "--dino-bottom", 0);
        isDinoJumping = false;
    }

    YVelocity -= GRAVITY * delta;
}

function onDinoJump(event) {
    if (event.code !== "Space" || isDinoJumping) {
        return;
    }

    YVelocity = JUMP_SPEED;
    isDinoJumping = true;
}