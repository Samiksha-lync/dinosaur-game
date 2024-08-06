import {
    getCustomStyleProperty,
    setCustomStyleProperty,
    updateCustomStyleProperty,
} from "./helper.js";

const SPEED = 0.05;
const groundElement = document.querySelectorAll("[data-ground]");

export function setupGround() {
    setCustomStyleProperty(groundElement[0], "--ground-left", 0);
    setCustomStyleProperty(groundElement[1], "--ground-left", 200);
}

export function updateGround(delta, speedScale) {
    groundElement.forEach((ground) => {
        updateCustomStyleProperty(
            ground,
            "--ground-left",
            delta * speedScale * SPEED * -1
        );

        if (getCustomStyleProperty(ground, "--ground-left") < -200) {
            updateCustomStyleProperty(ground, "--ground-left", 400);
        }
    });
}