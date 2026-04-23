const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");

const tableBody = document.getElementById("table-body");
const form = document.getElementById("book-form");

function Book(title, author, pages, wasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.wasRead = wasRead;
}

function addBookToLibrary(title, author, pages, wasRead) {
  const newBook = new Book(title, author, pages, wasRead);
  myLibrary.push(newBook);
}

function render() {
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = tableBody.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readCell.textContent = book.wasRead ? "Read" : "Not Read";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      render();
    });

    deleteCell.appendChild(deleteBtn);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readCheckbox.checked
  );

  form.reset();
  render();
});

render();
