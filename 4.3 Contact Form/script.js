const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("messageInput");
const submitBtn = document.getElementById("submitBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const formMessage = document.getElementById("formMessage");

const SERVICE_ID = "service_mg7xj65";
const TEMPLATE_ID = "template_cqbcpak";

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  clearErrors();
  clearFormMessage();

  let isValid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  if (name === "") {
    nameError.textContent = "Full name is required.";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (subject === "") {
    subjectError.textContent = "Subject is required.";
    isValid = false;
  }

  if (message === "") {
    messageError.textContent = "Message is required.";
    isValid = false;
  } else if (message.length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    isValid = false;
  }

  return isValid;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formMessage.textContent = "";

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);

    formMessage.textContent = "Message sent successfully.";
    formMessage.className = "success";
    contactForm.reset();
  } catch (error) {
    formMessage.textContent = "Failed to send message. Please try again.";
    formMessage.className = "fail";
    console.error("EmailJS Error:", error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
