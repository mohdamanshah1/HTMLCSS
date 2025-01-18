const Links = document.querySelectorAll("[data-tab-panel] > li > a");
const Tabs = document.querySelectorAll("[data-tab-content]");

let Title = ["Books - ", Tabs.item(0).id];
let TabIndex = 1;

document.title = Title.join("");
Links.forEach((element) => {
  element.addEventListener("click", LinkEventHandler);
});


function LinkEventHandler(element) {

  Links.forEach((ele) => {
    ele.classList.remove("active");
  });

  Tabs.forEach((ele) => {
    ele.classList.remove("active");
  });

  element.target.classList.add("active");
  document
    .querySelector(element.target.dataset.tabTarget)
    .classList.add("active");
  Title[1] = element.target.dataset.tabTarget.substr(1);
  document.title = Title.join("");
}



document.addEventListener('DOMContentLoaded', e => {

  function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = ''; // Clear current list
    books.forEach((book, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('book');
      listItem.innerHTML = `
              <strong>${book.title}</strong> - ${book.price} <br>
              ${book.description} <br>
              <img src="${book.image}" alt="Book Image" width="100">
              <br><br>
          `;
      booksList.appendChild(listItem);
    });
  }

  loadBooks();
  const bookForm = document.getElementById('bookForm');


  bookForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('hello');
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];

    const book = {
      title: title,
      description: description,
      price: parseFloat(price),
      image: ''
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        book.image = reader.result; // Store image as a Data URL
        saveBook(book);
      };
      reader.readAsDataURL(imageFile);
    } else {
      saveBook(book);
    }
  });

  function saveBook(book) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    document.getElementById('bookForm').reset();
    loadBooks();
  }
});
