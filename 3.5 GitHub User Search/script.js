const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const profileCard = document.getElementById("profileCard");
const reposSection = document.getElementById("reposSection");
const reposList = document.getElementById("reposList");

async function fetchGitHubUser(username) {
  message.textContent = "Loading...";
  profileCard.classList.add("hidden");
  reposSection.classList.add("hidden");
  reposList.innerHTML = "";

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    const userData = await userResponse.json();

    if (userData.message === "Not Found") {
      message.textContent = "User not found.";
      return;
    }

    message.textContent = "";
    renderUser(userData);

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
    );
    const reposData = await reposResponse.json();

    renderRepos(reposData);
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    console.error(error);
  }
}

function renderUser(user) {
  profileCard.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.login}" />
    <div class="profile-info">
      <h2>${user.name || "No name available"}</h2>
      <p class="username">@${user.login}</p>
      <p class="bio">${user.bio || "No bio available."}</p>

      <div class="stats">
        <span>Followers: ${user.followers}</span>
        <span>Following: ${user.following}</span>
        <span>Repos: ${user.public_repos}</span>
      </div>

      <div class="extra-info">
        <p><strong>Location:</strong> ${user.location || "Not available"}</p>
        <p><strong>Company:</strong> ${user.company || "Not available"}</p>
        <p><strong>Blog:</strong> ${
          user.blog
            ? `<a href="${user.blog}" target="_blank">${user.blog}</a>`
            : "Not available"
        }</p>
      </div>

      <a class="profile-link" href="${user.html_url}" target="_blank">View Profile</a>
    </div>
  `;

  profileCard.classList.remove("hidden");
}

function renderRepos(repos) {
  reposList.innerHTML = "";

  if (!repos.length) {
    reposList.innerHTML = "<p>No repositories found.</p>";
    reposSection.classList.remove("hidden");
    return;
  }

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    repoCard.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || "No description available."}</p>
      <div class="repo-details">
        <span>⭐ Stars: ${repo.stargazers_count}</span>
        <span>🍴 Forks: ${repo.forks_count}</span>
        <span>🛠 Language: ${repo.language || "Not specified"}</span>
      </div>
    `;

    reposList.appendChild(repoCard);
  });

  reposSection.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();

  if (!username) {
    message.textContent = "Please enter a GitHub username.";
    profileCard.classList.add("hidden");
    reposSection.classList.add("hidden");
    return;
  }

  fetchGitHubUser(username);
});

usernameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
