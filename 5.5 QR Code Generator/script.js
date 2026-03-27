const qrInput = document.getElementById("qrInput");
const generateBtn = document.getElementById("generateBtn");
const qrBox = document.getElementById("qrBox");
const qrImage = document.getElementById("qrImage");

generateBtn.addEventListener("click", () => {
  const inputValue = qrInput.value.trim();

  if (!inputValue) {
    qrBox.classList.remove("show");
    return;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(inputValue)}`;

  qrImage.src = qrUrl;
  qrBox.classList.add("show");
});
