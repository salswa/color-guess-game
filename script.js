const colorCodeContainer = document.querySelector(".color-code");
const colorOptionsContainer = document.querySelector(".color-options");
const scoreValueContainer = document.querySelector(".score .value");

/**
 * LocalStorage Keys
 */
const CURRENTSCORE = "currentScore";
const QUESTIONCOLOR = "questionColor";
const COLOROPTIONS = "colorOptions";

/**
 * Random Number Generator Method
 * @param {*} min
 * @param {*} max
 * @returns random number between min and max (inclusive)
 */
function generateRandomNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Random Color Generator
 * @returns a color in rgb format
 */
function generateRandomRGBColor() {
  const red = generateRandomNumberBetween(0, 255);
  const green = generateRandomNumberBetween(0, 255);
  const blue = generateRandomNumberBetween(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Localstorage Setters and Getters
 */
function setScore(score) {
  localStorage.setItem(CURRENTSCORE, score);
}

function getScore() {
  return Number(localStorage.getItem(CURRENTSCORE));
}

function setQuestionColor(color) {
  localStorage.setItem(QUESTIONCOLOR, color);
}

function setColorOptions(colors) {
  localStorage.setItem(COLOROPTIONS, JSON.stringify(colors));
}

function getQuestionColor() {
  return localStorage.getItem(QUESTIONCOLOR);
}

function getColorOptions() {
  return JSON.parse(localStorage.getItem(COLOROPTIONS));
}

/**
 * Question Color Generator
 */
function generateQuestionColor() {
  const color = generateRandomRGBColor();
  setQuestionColor(color);
}

/**
 * Mulitple Color Options Generator
 */
function generateColorOptions() {
  const colorOptions = [];
  const ansIndex = generateRandomNumberBetween(0, 5);
  const questionColor = getQuestionColor();

  for (let i = 0; i < 6; i++) {
    colorOptions.push(
      i === ansIndex ? questionColor : generateRandomRGBColor()
    );
  }
  setColorOptions(colorOptions);
}

/**
 * Methods to display related values on HTML
 */
function displayQuestionColor() {
  colorCodeContainer.innerHTML = getQuestionColor();
}

function displayScore() {
  scoreValueContainer.innerHTML = getScore();
}

function displayColorOptionsBox() {
  const colors = getColorOptions();
  console.log(colors);
  for (let i = 0; i < 6; i++) {
    const box = document.createElement("div");
    box.classList = "option";
    box.style.backgroundColor = colors[i];
    box.addEventListener("click", validateSelection);
    colorOptionsContainer.appendChild(box);
  }
}

/**
 * Function to validate selected answer
 */
function validateSelection(e) {
  const selectedColor = e.target.style.backgroundColor;
  console.log(selectedColor);
  let score = getScore();
  console.log(typeof score);
  if (selectedColor === getQuestionColor()) {
    score++;
    setScore(score);
    resetColors();
  } else {
    score = 0;
    setScore(score);
  }
  displayScore();
}

/**
 * Generate new colors wrapper function
 */
function generateNewColors() {
  generateQuestionColor();
  generateColorOptions();
}

/**
 * Display colors wrapper function
 */
function displayColors() {
  colorOptionsContainer.innerHTML = "";
  displayQuestionColor();
  displayColorOptionsBox();
}

/**
 * Reset colors
 */
function resetColors() {
  generateNewColors();
  displayColors();
}

/**
 * Initialize Game
 */
function initGame() {
  if (!localStorage.hasOwnProperty(QUESTIONCOLOR)) {
    generateNewColors();
  }
  displayColors();

  if (localStorage.hasOwnProperty(CURRENTSCORE)) {
    displayScore();
  } else {
    setScore(0);
    displayScore();
  }
}

window.addEventListener("load", () => initGame());
