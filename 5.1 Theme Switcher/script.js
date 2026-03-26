const buttons = document.querySelectorAll(".theme-btn");

const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(savedTheme);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.getAttribute("data-theme");

    document.body.classList.remove("light", "dark", "neon");

    document.body.classList.add(selectedTheme);

    localStorage.setItem("theme", selectedTheme);
  });
});
