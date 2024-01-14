// Book class
class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
      this.isAvailable = true;
    }
  
    borrowBook() {
      if (this.isAvailable) {
        this.isAvailable = false;
        console.log(`Book "${this.title}" by ${this.author} has been borrowed.`);
      } else {
        console.log(`Sorry, the book "${this.title}" is currently unavailable.`);
      }
    }
  
    returnBook() {
      this.isAvailable = true;
      console.log(`Book "${this.title}" has been returned. Thank you!`);
    }
  }
  
  // User class
  class User {
    constructor(name) {
      this.name = name;
      this.borrowedBooks = [];
    }
  
    borrowBook(book) {
      if (book.isAvailable) {
        book.borrowBook();
        this.borrowedBooks.push(book);
        console.log(`${this.name} has borrowed "${book.title}".`);
      } else {
        console.log(`${this.name}, the book "${book.title}" is currently unavailable.`);
      }
    }
  
    returnBook(book) {
      const index = this.borrowedBooks.indexOf(book);
      if (index !== -1) {
        this.borrowedBooks.splice(index, 1);
        book.returnBook();
        console.log(`${this.name} has returned "${book.title}".`);
      } else {
        console.log(`${this.name}, you didn't borrow "${book.title}".`);
      }
    }
  }
  
 
  const book1 = new Book("THE WINGS OF FIRE", "APJ.KALAM");
  const book2 = new Book("RAMAYANAM", "VALMIKI");
  
  
  const user1 = new User("Prashanth");
  const user2 = new User("Navitha");
  
  
  user1.borrowBook(book1);
  user2.borrowBook(book2);
  
  user1.returnBook(book1);
  user2.returnBook(book1);
  