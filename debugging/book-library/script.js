const myLibrary = [];
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");

window.addEventListener("load", function () {
  populateStorage();
  render(); // only called once now
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1, book2);

    // removed extra render() here
  }
}

function submit() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);

  if (!title || !author || !pages || pages <= 0) {
    alert("Please fill all fields correctly!");
    return;
  }

  const book = new Book(title, author, pages, readCheckbox.checked);

  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tbody = document.querySelector("#display tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const pagesCell = document.createElement("td");
    const wasReadCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    const toggleButton = document.createElement("button");
    toggleButton.className = "btn btn-success";
    toggleButton.textContent = myLibrary[i].check ? "Yes" : "No";

    toggleButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    wasReadCell.appendChild(toggleButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;

      myLibrary.splice(i, 1);
      render();

      alert(`You've deleted title: ${deletedTitle}`);
    });

    deleteCell.appendChild(deleteButton);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(wasReadCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  }
}
