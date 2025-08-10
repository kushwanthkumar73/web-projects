// Get DOM elements
let bookmarkFormEl = document.getElementById("bookmarkForm");
let siteNameInputEl = document.getElementById("siteNameInput");
let siteUrlInputEl = document.getElementById("siteUrlInput");
let siteNameErrMsgEl = document.getElementById("siteNameErrMsg");
let siteUrlErrMsgEl = document.getElementById("siteUrlErrMsg");
let bookmarksListEl = document.getElementById("bookmarksList");

let formData = {
    siteName: "",
    siteUrl: ""
};

// Track input changes
siteNameInputEl.addEventListener("change", function(event) {
    formData.siteName = event.target.value;
});

siteUrlInputEl.addEventListener("change", function(event) {
    formData.siteUrl = event.target.value;
});

// Validate form
function validateForm(formData) {
    let isValid = true;

    if (formData.siteName === "") {
        siteNameErrMsgEl.textContent = "Required*";
        isValid = false;
    } else {
        siteNameErrMsgEl.textContent = "";
    }

    if (formData.siteUrl === "") {
        siteUrlErrMsgEl.textContent = "Required*";
        isValid = false;
    } else {
        siteUrlErrMsgEl.textContent = "";
    }

    return isValid;
}

// Add and save bookmark
function addBookmark(formData, saveToStorage = true) {
    let listItemEl = document.createElement("li");
    listItemEl.classList.add("bookmark", "d-flex", "flex-column", "p-3", "mb-2");

    // Site name
    let nameEl = document.createElement("p");
    nameEl.textContent = formData.siteName;
    nameEl.classList.add("fw-bold", "mb-1");

    // Site URL
    let linkEl = document.createElement("a");
    linkEl.href = formData.siteUrl;
    linkEl.textContent = formData.siteUrl;
    linkEl.target = "_blank";
    linkEl.classList.add("text-primary", "mb-2");

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "w-25");
    deleteBtn.addEventListener("click", function() {
        deleteBookmark(formData.siteUrl);
    });

    listItemEl.appendChild(nameEl);
    listItemEl.appendChild(linkEl);
    listItemEl.appendChild(deleteBtn);
    bookmarksListEl.appendChild(listItemEl);

    if (saveToStorage) {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        bookmarks.push(formData);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
}

// Load bookmarks from storage on page load
function loadBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarksListEl.innerHTML = "";
    bookmarks.forEach(function(bookmark) {
        addBookmark(bookmark, false);
    });
}

// Delete bookmark
function deleteBookmark(urlToDelete) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks = bookmarks.filter(bookmark => bookmark.siteUrl !== urlToDelete);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    loadBookmarks();
}

// Form submit
bookmarkFormEl.addEventListener("submit", function(event) {
    event.preventDefault();

    formData.siteName = siteNameInputEl.value.trim();
    formData.siteUrl = siteUrlInputEl.value.trim();

    if (validateForm(formData)) {
        addBookmark(formData);
        bookmarkFormEl.reset();
        formData.siteName = "";
        formData.siteUrl = "";
    }
});

// Initial load
loadBookmarks();