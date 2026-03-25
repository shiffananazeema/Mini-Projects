const formTitle = document.getElementById("formTitle");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const authForm = document.getElementById("authForm");

const nameGroup = document.getElementById("nameGroup");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

let isLoginMode = true;

function setMode(loginMode) {
  isLoginMode = loginMode;

  clearErrors();
  clearInputs();
  clearMessage();

  if (isLoginMode) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    nameGroup.classList.add("hidden");
  } else {
    formTitle.textContent = "Signup";
    submitBtn.textContent = "Signup";
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    nameGroup.classList.remove("hidden");
  }
}

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
}

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

function clearMessage() {
  message.textContent = "";
  message.className = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  clearErrors();
  clearMessage();

  let isValid = true;

  if (!isLoginMode && nameInput.value.trim() === "") {
    nameError.textContent = "Full name is required.";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    isValid = false;
  } else if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    isValid = false;
  }

  return isValid;
}

function signupUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && savedUser.email === email) {
    message.textContent = "User already exists. Please login.";
    message.className = "fail";
    return;
  }

  const userData = {
    name,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(userData));
  message.textContent = "Signup successful. You can now login.";
  message.className = "success";
  clearInputs();
}

function loginUser() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    message.textContent = "No account found. Please signup first.";
    message.className = "fail";
    return;
  }

  if (savedUser.email === email && savedUser.password === password) {
    message.textContent = `Welcome back, ${savedUser.name}!`;
    message.className = "success";
    clearInputs();
  } else {
    message.textContent = "Invalid email or password.";
    message.className = "fail";
  }
}

loginTab.addEventListener("click", () => {
  setMode(true);
});

signupTab.addEventListener("click", () => {
  setMode(false);
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  if (isLoginMode) {
    loginUser();
  } else {
    signupUser();
  }
});

setMode(true);
