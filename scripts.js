let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

if (localStorage.getItem("books") === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem("books"));
  myLibrary = booksFromStorage;
}

function showLibraryInfo() {
  const booksRead = document.querySelector("#books-read");
  const booksUnread = document.querySelector("#books-unread");
  const totalBooks = document.querySelector("#total-books");
  let readCounter = 0;
  let unreadCounter = 0;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === true) {
      readCounter += 1;
      booksRead.textContent = readCounter;
    } else if (myLibrary[i].status === false) {
      unreadCounter += 1;
      booksUnread.textContent = unreadCounter;
    }
  }
  totalBooks.textContent = myLibrary.length;
}

function showBooksInLibrary() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
  showLibraryInfo();
  const bookList = document.querySelector("#table-body");
  bookList.textContent = "";
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookRow = document.createElement("tr");
    bookRow.classList.add("book-info");
    bookList.appendChild(bookRow);
    // BOOK TITLE
    const bookTitle = document.createElement("td");
    bookTitle.classList.add("tb-title");
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);
    // BOOK AUTHOR
    const bookAuthor = document.createElement("td");
    bookAuthor.classList.add("tb-author");
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);
    // BOOK PAGES
    const bookPages = document.createElement("td");
    bookPages.textContent = myLibrary[i].pages;
    bookRow.appendChild(bookPages);
    // BOOK STATUS BUTTON
    const bookStatus = document.createElement("td");
    const statusSymbol = document.createElement("p");
    if (myLibrary[i].status === false) {
      statusSymbol.innerText = "NOT READED";
      statusSymbol.classList.add("not-read");
    } else {
      statusSymbol.innerText = "READED";
      statusSymbol.classList.add("read");
    }
    bookStatus.appendChild(statusSymbol);
    bookRow.appendChild(bookStatus);
    // BOOK REMOVAL BUTTON
    const bookDelete = document.createElement("td");
    const deleteSymbol = document.createElement("p");
    deleteSymbol.innerText = "DELETE BOOK";
    deleteSymbol.classList.add("del-btn");
    bookDelete.appendChild(deleteSymbol);
    bookRow.appendChild(bookDelete);
  }
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  showBooksInLibrary();
}

// FORM VALIDATION
function validateForm(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const titleErr = document.querySelector(".title");
  const nameInput = document.querySelector("#author");
  const nameErr = document.querySelector(".author");
  const numberInput = document.querySelector("#pages");
  const numberErr = document.querySelector(".pages");
  const checkbox = document.querySelector('input[name="checkbox"]');
  if (titleInput.value === "") {
    titleErr.style.display = "block";
  } else {
    titleErr.style.display = "none";
  }
  if (nameInput.value === "") {
    nameErr.style.display = "block";
  } else {
    nameErr.style.display = "none";
  }
  if (numberInput.value === "" || numberInput.value <= 0) {
    numberErr.style.display = "block";
  } else {
    numberErr.style.display = "none";
  }
  if (
    titleInput.value !== "" &&
    nameInput.value !== "" &&
    numberInput.value !== "" &&
    numberInput.value > 0
  ) {
    if (checkbox.checked) {
      addBookToLibrary(
        titleInput.value,
        nameInput.value,
        numberInput.value,
        true
      );
    } else {
      addBookToLibrary(
        titleInput.value,
        nameInput.value,
        numberInput.value,
        false
      );
    }
    form.reset();
  }
}

// MODAL FOR BOOKS REMOVAL
function manipulateModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "block";
  modal.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("close")) {
      modal.style.display = "none";
    } else if (target.classList.contains("confirm-removal")) {
      myLibrary = [];
      modal.style.display = "none";
    }
  });
}

function listenClicks() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === "add-book") {
      validateForm(event);
    } else if (target.id === "delete-all-btn") {
      manipulateModal();
    } else if (target.classList.contains("del-btn")) {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains("read")) {
      target.classList.remove("read");
      target.classList.add("not-read");
      myLibrary[tr].status = false;
    } else if (target.classList.contains("not-read")) {
      target.classList.remove("not-read");
      target.classList.add("read");
      myLibrary[tr].status = true;
    }
    showBooksInLibrary();
  });
}

showBooksInLibrary();
listenClicks();
