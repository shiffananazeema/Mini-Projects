const movieInput = document.querySelector("#movieInput");
const searchBtn = document.querySelector("#searchBtn");
const sortYear = document.querySelector("#sortYear");
const message = document.querySelector("#message");
const moviesList = document.querySelector("#moviesList");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const pageInfo = document.querySelector("#pageInfo");

const movieModal = document.querySelector("#movieModal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

const API_KEY = "YOUR_API_KEY";

let currentSearch = "";
let currentPage = 1;
let totalResults = 0;
let currentMovies = [];

async function searchMovies(movieName, page = 1) {
  message.textContent = "Loading...";
  moviesList.innerHTML = "";
  pageInfo.textContent = `Page ${page}`;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&page=${page}&apikey=${API_KEY}`,
    );

    const data = await response.json();

    if (data.Response === "False") {
      message.textContent = "No movies found.";
      moviesList.innerHTML = "";
      totalResults = 0;
      updatePagination();
      return;
    }

    message.textContent = "";
    currentMovies = data.Search;
    totalResults = Number(data.totalResults);
    applySortAndRender();
    updatePagination();
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    console.error(error);
  }
}

function getYearValue(yearText) {
  const year = parseInt(yearText);
  return isNaN(year) ? 0 : year;
}

function applySortAndRender() {
  let sortedMovies = [...currentMovies];

  if (sortYear.value === "newest") {
    sortedMovies.sort((a, b) => getYearValue(b.Year) - getYearValue(a.Year));
  } else if (sortYear.value === "oldest") {
    sortedMovies.sort((a, b) => getYearValue(a.Year) - getYearValue(b.Year));
  }

  renderMovies(sortedMovies);
}

function renderMovies(movies) {
  moviesList.innerHTML = "";

  movies.forEach((movie) => {
    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/180x270?text=No+Image";

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-item");

    movieCard.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p><strong>Year:</strong> ${movie.Year}</p>
      <button data-id="${movie.imdbID}">Details</button>
    `;

    moviesList.appendChild(movieCard);
  });

  const buttons = document.querySelectorAll(".movie-item button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const imdbID = this.dataset.id;
      fetchMovieDetails(imdbID);
    });
  });
}

async function fetchMovieDetails(imdbID) {
  modalBody.innerHTML = `<p>Loading details...</p>`;
  movieModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`,
    );

    const data = await response.json();

    if (data.Response === "False") {
      modalBody.innerHTML = `<p>Details not found.</p>`;
      return;
    }

    renderMovieDetails(data);
  } catch (error) {
    modalBody.innerHTML = `<p>Failed to load details.</p>`;
    console.error(error);
  }
}

function renderMovieDetails(movie) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/260x390?text=No+Image";

  modalBody.innerHTML = `
    <div class="modal-movie">
      <img src="${poster}" alt="${movie.Title}">
      <div class="modal-details">
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Rated:</strong> ${movie.Rated}</p>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
      </div>
    </div>
  `;
}

function updatePagination() {
  const totalPages = Math.ceil(totalResults / 10);

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;

  pageInfo.textContent =
    totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : "Page 0";
}

function closeMovieModal() {
  movieModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function handleSearch() {
  const movieName = movieInput.value.trim();

  if (movieName === "") {
    message.textContent = "Please enter a movie name.";
    moviesList.innerHTML = "";
    totalResults = 0;
    currentPage = 1;
    updatePagination();
    return;
  }

  currentSearch = movieName;
  currentPage = 1;
  searchMovies(currentSearch, currentPage);
}

searchBtn.addEventListener("click", handleSearch);

movieInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

sortYear.addEventListener("change", applySortAndRender);

prevBtn.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    searchMovies(currentSearch, currentPage);
  }
});

nextBtn.addEventListener("click", function () {
  const totalPages = Math.ceil(totalResults / 10);
  if (currentPage < totalPages) {
    currentPage++;
    searchMovies(currentSearch, currentPage);
  }
});

closeModal.addEventListener("click", closeMovieModal);

movieModal.addEventListener("click", function (event) {
  if (event.target === movieModal) {
    closeMovieModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !movieModal.classList.contains("hidden")) {
    closeMovieModal();
  }
});

updatePagination();
