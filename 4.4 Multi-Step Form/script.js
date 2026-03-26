const form = document.getElementById("multiStepForm");
const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const successMessage = document.getElementById("successMessage");
const progressFill = document.getElementById("progressFill");

const indicators = [
  document.getElementById("indicator0"),
  document.getElementById("indicator1"),
  document.getElementById("indicator2"),
];

let currentStep = 0;

function updateUI() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index <= currentStep);
  });

  const progressWidth = ((currentStep + 1) / formSteps.length) * 100;
  progressFill.style.width = `${progressWidth}%`;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((error) => {
    error.textContent = "";
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStep(stepIndex) {
  clearErrors();
  let isValid = true;

  if (stepIndex === 0) {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();

    if (fullName === "") {
      document.getElementById("fullNameError").textContent =
        "Full name is required.";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
    } else if (!validateEmail(email)) {
      document.getElementById("emailError").textContent =
        "Enter a valid email address.";
      isValid = false;
    }
  }

  if (stepIndex === 1) {
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();

    if (phone === "") {
      document.getElementById("phoneError").textContent =
        "Phone number is required.";
      isValid = false;
    }

    if (city === "") {
      document.getElementById("cityError").textContent = "City is required.";
      isValid = false;
    }
  }

  if (stepIndex === 2) {
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (password === "") {
      document.getElementById("passwordError").textContent =
        "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters.";
      isValid = false;
    }

    if (confirmPassword === "") {
      document.getElementById("confirmPasswordError").textContent =
        "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
      isValid = false;
    }
  }

  return isValid;
}

nextBtns.forEach((button) => {
  button.addEventListener("click", () => {
    successMessage.textContent = "";

    if (validateStep(currentStep)) {
      currentStep++;
      updateUI();
    }
  });
});

prevBtns.forEach((button) => {
  button.addEventListener("click", () => {
    successMessage.textContent = "";
    clearErrors();

    if (currentStep > 0) {
      currentStep--;
      updateUI();
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  if (validateStep(currentStep)) {
    successMessage.textContent = "Account created successfully.";
    form.reset();
    currentStep = 0;
    clearErrors();
    updateUI();
  }
});

updateUI();
