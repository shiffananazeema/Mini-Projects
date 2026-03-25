const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const lengthInput = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const message = document.getElementById("message");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

function generatePassword() {
  const length = Number(lengthInput.value);
  let characters = "";
  let password = "";

  clearMessage();

  if (length < 4 || length > 32) {
    message.textContent = "Password length must be between 4 and 32.";
    passwordOutput.value = "";
    return;
  }

  if (uppercaseCheckbox.checked) {
    characters += uppercaseChars;
  }

  if (lowercaseCheckbox.checked) {
    characters += lowercaseChars;
  }

  if (numbersCheckbox.checked) {
    characters += numberChars;
  }

  if (symbolsCheckbox.checked) {
    characters += symbolChars;
  }

  if (characters === "") {
    message.textContent = "Please select at least one option.";
    passwordOutput.value = "";
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  passwordOutput.value = password;
  message.textContent = "Password generated successfully.";
  message.className = "success";
}

function copyPassword() {
  clearMessage();

  if (passwordOutput.value === "") {
    message.textContent = "Generate a password first.";
    return;
  }

  navigator.clipboard
    .writeText(passwordOutput.value)
    .then(() => {
      message.textContent = "Password copied to clipboard.";
      message.className = "success";
    })
    .catch(() => {
      message.textContent = "Failed to copy password.";
    });
}

function clearMessage() {
  message.textContent = "";
  message.className = "";
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
