const urlInput = document.getElementById("urlInput");
const shortenBtn = document.getElementById("shortenBtn");
const resultBox = document.getElementById("resultBox");
const shortUrl = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

const API_TOKEN = "YOUR_API_TOKEN_TINYURL";

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

shortenBtn.addEventListener("click", async () => {
  const longUrl = urlInput.value.trim();

  resultBox.style.display = "none";
  message.textContent = "";

  if (!longUrl) {
    message.textContent = "Please enter a URL.";
    return;
  }

  if (!isValidUrl(longUrl)) {
    message.textContent = "Please enter a valid URL.";
    return;
  }

  if (API_TOKEN === "PASTE_YOUR_TINYURL_API_TOKEN_HERE") {
    message.textContent = "Add your TinyURL API token in script.js first.";
    return;
  }

  shortenBtn.textContent = "Loading...";
  shortenBtn.disabled = true;

  try {
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        url: longUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent =
        data.errors?.[0]?.message || "Failed to shorten URL.";
      return;
    }

    const tinyLink = data.data.tiny_url;

    shortUrl.textContent = tinyLink;
    shortUrl.href = tinyLink;
    resultBox.style.display = "flex";
  } catch {
    message.textContent = "Something went wrong. Please try again.";
  } finally {
    shortenBtn.textContent = "Shorten";
    shortenBtn.disabled = false;
  }
});

copyBtn.addEventListener("click", async () => {
  if (!shortUrl.textContent) return;

  await navigator.clipboard.writeText(shortUrl.textContent);
  copyBtn.textContent = "Copied!";

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1500);
});
