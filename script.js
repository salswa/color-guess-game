const colorCodeContainer = document.querySelector(".color-code");
const colorOptionsContainer = document.querySelector(".color-options");
const scoreValueContainer = document.querySelector(".score .value");

/** Random Number Generator Method */

function generateRandomNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Random Color Generator */

function generateRandomRGBColor() {
  const red = generateRandomNumberBetween(0, 255);
  const green = generateRandomNumberBetween(0, 255);
  const blue = generateRandomNumberBetween(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

/** Question Color Generator */

function generateQuestionColor() {
  const color = generateRandomRGBColor();
  setQuestionColor(color);
}

/** Mulitple Color Options Generator  */

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

/** START | Methods to display related values on HTML */

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
/** END | Methods to display related values on HTML */

/** START | localstorage Setters and Getters */

function setScore(score) {
  localStorage.setItem("currentScore", score);
}

function getScore() {
  return Number(localStorage.getItem("currentScore"));
}

function setQuestionColor(color) {
  localStorage.setItem("questionColor", color);
}

function setColorOptions(colors) {
  localStorage.setItem("colorOptions", JSON.stringify(colors));
}

function getQuestionColor() {
  return localStorage.getItem("questionColor");
}

function getColorOptions() {
  return JSON.parse(localStorage.getItem("colorOptions"));
}

/** END | localstorage Setters and Getters */

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

function generateNewColors() {
  generateQuestionColor();
  generateColorOptions();
}

function displayColors() {
  colorOptionsContainer.innerHTML = "";
  displayQuestionColor();
  displayColorOptionsBox();
}

function resetColors() {
  generateNewColors();
  displayColors();
}

function initGame() {
  if (!localStorage.hasOwnProperty("questionColor")) {
    generateNewColors();
  }
  displayColors();

  if (localStorage.hasOwnProperty("currentScore")) {
    displayScore();
  } else {
    setScore(0);
    displayScore();
  }
}

window.addEventListener("load", () => initGame());
