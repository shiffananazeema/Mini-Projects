const searchInput = document.getElementById("searchInput");
const recipeCards = document.querySelectorAll(".recipe-card");
const viewButtons = document.querySelectorAll(".view-btn");
const modal = document.getElementById("recipeModal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalIngredients = document.getElementById("modalIngredients");
const modalSteps = document.getElementById("modalSteps");

searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase();

  recipeCards.forEach((card) => {
    const recipeName = card.getAttribute("data-name").toLowerCase();

    if (recipeName.includes(searchValue)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".recipe-card");
    const name = card.getAttribute("data-name");
    const ingredients = card.getAttribute("data-ingredients").split(",");
    const steps = card.getAttribute("data-steps").split("|");

    modalTitle.textContent = name;
    modalIngredients.innerHTML = "";
    modalSteps.innerHTML = "";

    ingredients.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.trim();
      modalIngredients.appendChild(li);
    });

    steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step.trim();
      modalSteps.appendChild(li);
    });

    modal.classList.add("show");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});
