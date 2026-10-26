// Q3: Library Management System (Classes + Objects)

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = false;   // every book starts as available
  }

  issueBook() {
    if (this.isIssued) {
      return `"${this.title}" is already issued.`;
    }
    this.isIssued = true;
    return `"${this.title}" has been issued.`;
  }

  returnBook() {
    if (!this.isIssued) {
      return `"${this.title}" was not issued.`;
    }
    this.isIssued = false;
    return `"${this.title}" has been returned.`;
  }
}

const books = [
  new Book("Eloquent JavaScript", "Marijn Haverbeke", "ISBN-101"),
  new Book("You Don't Know JS", "Kyle Simpson", "ISBN-102"),
  new Book("Clean Code", "Robert C. Martin", "ISBN-103"),
  new Book("The Pragmatic Programmer", "Andrew Hunt", "ISBN-104"),
];

// Print all books that are not issued
function displayAvailableBooks() {
  console.log("Available books:");
  books
    .filter((book) => !book.isIssued)
    .forEach((book) => console.log(`  ${book.isbn} - ${book.title} by ${book.author}`));
}

// Search by ISBN and issue the book
function issueBookByIsbn(isbn) {
  const foundBook = books.find((book) => book.isbn === isbn);
  if (!foundBook) {
    console.log(`No book found with ISBN ${isbn}.`);
    return;
  }
  console.log(foundBook.issueBook());
}

displayAvailableBooks();
console.log();
issueBookByIsbn("ISBN-102");   // issues successfully
issueBookByIsbn("ISBN-102");   // already issued
issueBookByIsbn("ISBN-999");   // not found
console.log();
displayAvailableBooks();       // ISBN-102 no longer listed
console.log();
console.log(books[1].returnBook());
displayAvailableBooks();
