"use strict";

const choiceScreen = document.querySelector("#choice-screen");
const nameScreen = document.querySelector("#name-screen");
const loadingScreen = document.querySelector("#loading-screen");
const resultScreen = document.querySelector("#result-screen");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const nameLabel = document.querySelector("#name-label");
const submitButton = document.querySelector("#submit-button");
const loadingMessage = document.querySelector("#loading-message");
const resultMessage = document.querySelector("#result-message");

const screens = [choiceScreen, nameScreen, loadingScreen, resultScreen];
const loadingMessages = [
  "Checking their profile...",
  "Performing highly scientific analysis...",
  "Consulting the imaginary experts...",
  "Reading the vibes (very carefully)...",
  "Asking the stars for a second opinion..."
];
const verdicts = [
  "The name sounds fishy. Proceed with a healthy amount of caution.",
  "The vibes are giving mystery novel. Gather more clues first.",
  "The stars say: maybe! A friendly hello can't hurt.",
  "The totally real data says you should go for it (be nice, though).",
  "Analysis complete: trust your gut and keep it low-pressure.",
  "The name passed the vibe check. Your move!",
  "Our experts are divided. Perhaps start with a casual conversation?",
  "Result: intriguing. Further snack-based research may be required.",
  "The vibes are inconclusive. A simple hello is still an option.",
  "The algorithm says: be yourself. Extremely advanced, we know."
];

let loadingInterval;

function showScreen(screenToShow) {
  screens.forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function selectGender(gender) {
  const targetPronoun = gender === "girl" ? "him" : "her";
  const possessivePronoun = gender === "girl" ? "his" : "her";

  nameLabel.textContent = `Enter ${possessivePronoun} name`;
  nameInput.placeholder = `Enter ${possessivePronoun} name`;
  nameInput.setAttribute("aria-label", `Enter ${possessivePronoun} name`);
  submitButton.textContent = `Should I approach ${targetPronoun}?`;

  showScreen(nameScreen);
  nameInput.focus();
}

function startAnalysis(name) {
  showScreen(loadingScreen);
  loadingMessage.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  loadingInterval = window.setInterval(() => {
    loadingMessage.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  }, 650);

  window.setTimeout(() => {
    window.clearInterval(loadingInterval);
    loadingInterval = undefined;

    const verdict = verdicts[Math.floor(Math.random() * verdicts.length)];
    resultMessage.textContent = `${name}, ${verdict.charAt(0).toLowerCase()}${verdict.slice(1)}`;
    showScreen(resultScreen);
  }, 2800);
}

document.querySelectorAll("[data-gender]").forEach((button) => {
  button.addEventListener("click", () => selectGender(button.dataset.gender));
});

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();

  if (!name) {
    nameInput.focus();
    return;
  }

  startAnalysis(name);
});

document.querySelector("#change-choice").addEventListener("click", () => {
  nameForm.reset();
  showScreen(choiceScreen);
});

document.querySelector("#play-again").addEventListener("click", () => {
  nameForm.reset();
  showScreen(nameScreen);
  nameInput.focus();
});