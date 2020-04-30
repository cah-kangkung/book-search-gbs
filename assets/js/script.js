const form = document.querySelector('form');
const input = document.querySelector('input');
const bookContainer = document.querySelector('.books')
const welcomingDiv = document.querySelector('.welcoming-div');
const loader = document.querySelector('.loading-animation');
const API_URL = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyC58PSxJ9gNxc4IPWJHa-90tOlcpm2oLsY&q=';

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchValue = input.value;
    searchBooks(searchValue);
});

const searchBooks = async (searchValue) => {
    bookContainer.innerHTML = '';
    welcomingDiv.style.display = 'none';
    loader.style.display = 'flex';
    try {
        const url = `${API_URL}${searchValue}`;
        const response = await fetch(url);
        const books = await response.json();

        displayBooks(books.items);
    } catch (error) {
        throw (error);
    }
};

const displayBooks = (books) => {
    if (books == undefined) {
        bookContainer.innerHTML =
            `<div class="not-found">
                <h1>Books Not Found!</h1>
            </div>`
    }
    loader.style.display = 'none';
    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const thumbnail = bookInfo.imageLinks.thumbnail;
        const link = bookInfo.infoLink;
        const title = bookInfo.title;
        const authors = bookInfo.authors;

        const bookCard =
            `<div class="book-card">
                <a target="_blank" rel="noopener noreferrer" href="${link}">
                    <img src="${thumbnail}" alt="">
                    <p>${title}</p>
                </a>
                <small>${authors.toString()}</small>
            </div>`

        bookContainer.innerHTML += bookCard;

    });
};
