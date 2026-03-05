const textDisplay = document.querySelector(".text");
const input = document.getElementById("input");
const mistakeTag = document.querySelector(".mistakes");
const timeTag = document.querySelector(".time");
const wpmTag = document.querySelector(".wpm");
const cpmTag = document.querySelector(".cpm");

let charIndex = 0;
let mistake = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;

function loadText() {
  textDisplay.innerHTML = "";
  let randomPara = Math.floor(Math.random() * paragraphs.length);

  paragraphs[randomPara].split("").forEach((ch) => {
    textDisplay.innerHTML += `<span>${ch}</span>`;
  });
  textDisplay.querySelector("span")?.classList.add("active");
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeTag.innerHTML = timeLeft;
      updateStats();
    } else {
      clearInterval(timer);
      input.blur();
      alert("Time's up! Your typing test is over.");
    }
  }, 1000);
}

function updateStats() {
  const correctChars = charIndex - mistake;
  const timeSpent = maxTime - timeLeft; // seconds
  const wpm =
    timeSpent > 0 ? Math.round((correctChars / 5 / timeSpent) * 60) : 0;

  wpmTag.innerText = wpm;
  cpmTag.innerText = correctChars > 0 ? correctChars : 0;
}

input.addEventListener("input", () => {
  const characters = textDisplay.querySelectorAll("span");
  const typedChar = input.value.split("")[charIndex];
  if (charIndex >= characters.length) return;

  if (!isTyping) {
    startTimer();
    isTyping = true;
  }

  if (typedChar == null) {
    if (charIndex <= 0) return;
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistake--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    if (characters[charIndex].textContent === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistake++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }
  characters.forEach((span) => span.classList.remove("active"));
  if (charIndex < characters.length) {
    characters[charIndex].classList.add("active");
    characters[charIndex].scrollIntoView({ block: "nearest" });
  }
  mistakeTag.innerHTML = mistake;
  updateStats();

  if (charIndex === characters.length) {
    clearInterval(timer);
    input.blur();
    alert("Finished!");
  }
});

function reset() {
  clearInterval(timer);
  charIndex = 0;
  mistake = 0;
  timeLeft = maxTime;
  isTyping = false;

  timeTag.innerHTML = maxTime;
  mistakeTag.innerText = 0;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
  input.value = "";

  loadText();
  textDisplay.scrollTop = 0;
}

loadText();

document.addEventListener("click", () => input.focus());
document.addEventListener("keydown", () => input.focus());
