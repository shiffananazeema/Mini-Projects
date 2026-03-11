const nameInput = document.querySelector(".input-name");
const urlInput = document.querySelector(".input-url");
const list = document.querySelector(".bookmark-list");

let bookmarks = loadBookmarks();

function loadBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function normalizeUrl(url) {
  url = url.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

function render() {
  list.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const li = document.createElement("li");
    li.dataset.id = bookmark.id;
    li.innerHTML = `
      <span class="bookmark-name">${bookmark.name}</span>
      <a href="${bookmark.url}" target="_blank" class="bookmark-url">Open</a>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addBookmark() {
  const name = nameInput.value.trim();
  let url = urlInput.value.trim();

  if (!name || !url) {
    alert("Please enter both name and URL");
    return;
  }

  bookmarks.push({
    id: Date.now(),
    name,
    url: normalizeUrl(url),
  });

  saveBookmarks();
  render();
  nameInput.value = "";
  urlInput.value = "";
  nameInput.focus();
}

function editBookmark(id) {
  const bookmark = bookmarks.find((item) => item.id === id);
  if (!bookmark) return;

  const newName = prompt("Edit bookmark name:", bookmark.name);
  const newUrl = prompt("Edit bookmark URL:", bookmark.url);

  if (newName === null || newUrl === null) return;

  const name = newName.trim();
  const url = newUrl.trim();

  if (!name || !url) {
    alert("Name and URL cannot be empty");
    return;
  }

  bookmarks = bookmarks.map((item) =>
    item.id === id ? { ...item, name, url: normalizeUrl(url) } : item,
  );

  saveBookmarks();
  render();
}

function deleteBookmark(id) {
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
  saveBookmarks();
  render();
}

window.addBookmark = addBookmark;

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("edit-btn")) {
    editBookmark(id);
  }

  if (e.target.classList.contains("delete-btn")) {
    deleteBookmark(id);
  }
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBookmark();
});

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBookmark();
});

render();
