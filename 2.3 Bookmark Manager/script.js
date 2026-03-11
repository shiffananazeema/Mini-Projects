const nameInput = document.querySelector(".input-name");
const urlInput = document.querySelector(".input-url");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

displayBookmarks();

function addBookmark() {
  let name = nameInput.value.trim();
  let url = urlInput.value.trim();

  if (!name || !url) {
    alert("Please enter both name and URL");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const bookmark = {
    name: name,
    url: url,
  };

  bookmarks.push(bookmark);
  saveBookmarks();
  displayBookmarks();

  nameInput.value = "";
  urlInput.value = "";
}

function displayBookmarks() {
  const list = document.querySelector(".bookmark-list");
  list.innerHTML = "";

  bookmarks.forEach(function (bookmark, index) {
    list.innerHTML += `
      <li>
        <span class="bookmark-name">${bookmark.name}</span>
        <a href="${bookmark.url}" target="_blank" class="bookmark-url">Open</a>
        <div class="actions">
          <button class="edit-btn" onclick="editBookmark(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  saveBookmarks();
  displayBookmarks();
}

function editBookmark(index) {
  const newName = prompt("Edit bookmark name:", bookmarks[index].name);
  const newUrl = prompt("Edit bookmark URL:", bookmarks[index].url);

  if (newName === null || newUrl === null) {
    return;
  }

  const trimmedName = newName.trim();
  let trimmedUrl = newUrl.trim();

  if (!trimmedName || !trimmedUrl) {
    alert("Name and URL cannot be empty");
    return;
  }

  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
    trimmedUrl = "https://" + trimmedUrl;
  }

  bookmarks[index].name = trimmedName;
  bookmarks[index].url = trimmedUrl;

  saveBookmarks();
  displayBookmarks();
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
