const imageCards = document.querySelectorAll(".image-card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");

imageCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    modalImg.src = image.src;
    modalImg.alt = image.alt;
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
