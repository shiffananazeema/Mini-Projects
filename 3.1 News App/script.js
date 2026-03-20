const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const newsContainer = document.querySelector("#newsContainer");
const message = document.querySelector("#message");
const categoryButtons = document.querySelectorAll(".category-btn");

const API_KEY = "YOUR_API_KEY";

let articles = [];
let currentCategory = "general";

async function fetchNews(url) {
  message.textContent = "Loading news...";
  newsContainer.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    articles = data.articles || [];
    render();
  } catch (error) {
    articles = [];
    message.textContent = "Failed to load news.";
    console.error(error);
  }
}

function render() {
  newsContainer.innerHTML = "";

  if (articles.length === 0) {
    if (message.textContent !== "Failed to load news.") {
      message.textContent = "No news found.";
    }
    return;
  }

  message.textContent = "";

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${article.image || "https://via.placeholder.com/400x200?text=No+Image"}" alt="${article.title}">
      <div class="news-content">
        <div class="news-source">${article.source?.name || "Unknown Source"}</div>
        <h3>${article.title}</h3>
        <p>${article.description ? article.description.slice(0, 120) + "..." : "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}

function getTopHeadlines(category = "general") {
  currentCategory = category;

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=12&apikey=${API_KEY}`;
  fetchNews(url);
}

function searchNews() {
  const query = searchInput.value.trim();

  if (!query) {
    getTopHeadlines(currentCategory);
    return;
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=12&apikey=${API_KEY}`;
  fetchNews(url);
}

searchBtn.addEventListener("click", searchNews);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchNews();
  }
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    getTopHeadlines(button.dataset.category);
  });
});

getTopHeadlines();
