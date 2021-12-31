import { Component, OnInit } from '@angular/core';

import { BookListService } from '../book-list.service';

export interface Book {
  id: number,
  date: number,
  title: string,
  author: Author,
  quotes?: string[],
  note?: string
}

interface Author {
  firstName: string,
  lastName: string
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  editing: Boolean;
  adding: Boolean;
  results: Boolean;
  bookToEdit?: Book;
  books?: Book[];
  nextId: number;

  constructor(private bookListService: BookListService) {
    this.editing = false;
    this.adding = false;
    this.results = false;
    this.nextId = -1;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  handleNew() {
    if (this.books) {
      this.nextId = Math.max(...this.books.map(b => b.id)) + 1;
      // console.log(`nextId: ${this.nextId}`);

      this.adding = true;
      this.editing = true;
    }
  }

  handleEditing(id: number) {
    if (this.books) {
      this.bookToEdit = this.books.find(book => book.id === id);
    }
    this.editing = true;
  }

  handleCancel() {
    this.editing = false;
    this.adding = false;
  }

  handleSave(event: Book) {
    if (this.adding) {
      this.bookListService.addBook(event).subscribe((data: Book) => {
        this.books?.push(event);
        this.editing = false;
        this.adding = false;
        // console.log(this.books);
      });
    } else {
      this.bookListService.updateBook(event).subscribe((data: Book) => {
        this.books = this.books?.map((book: Book) => {
          if (event.id === book.id) {
            book = Object.assign({}, book, event);
          }
          return book;
        });
        // console.log(this.books);
      });
    }

    this.editing = false;
    this.adding = false;
  }

  getReadableDate(date: number): string {
    const dateObject = new Date(date);
    let dateString: string = dateObject.toLocaleString();
    dateString = dateString.substring(0, dateString.length - 3);
    return dateString;
  }

  handleDeleting(event: any) {
    // console.log(button);
    const button = event.target as HTMLElement;
    // console.log(buttonElement);
    const deletingBlock = button.nextElementSibling;
    // console.log(deletingBlock);

    button.style.display = 'none';

    if (deletingBlock?.matches('.deleting')) {
      // console.log('matches');
      const deletingBlockHtmlEl = deletingBlock as HTMLElement;
      deletingBlockHtmlEl.style.display = 'inline';
    }
  }

  cancelDeleting(event: any) {
    const button = event.target as HTMLElement;
    const deletingBlock = button.parentElement;

    if (deletingBlock?.matches('.deleting')) {
      const deletingBlockHtmlEl = deletingBlock as HTMLElement;
      deletingBlockHtmlEl.style.display = 'none';
    }

    const deleteButton = deletingBlock?.previousElementSibling;

    if (deleteButton?.matches('.book__delete-button')) {
      const deleteButtonHtmlEl = deleteButton as HTMLElement;
      deleteButtonHtmlEl.style.display = 'inline-block';
    }
  }

  deleteBook(bookId: number) {
    this.bookListService.deleteBook(bookId).subscribe( () => {
      this.books = this.books?.filter(book => book.id != bookId);
    });
  }

  handleSearch(query: string) {
    // console.log(`searching for ${query}`);
    
    if (!this.results) {
      this.books = this.books?.filter(book => {
        return this.bookMatched(book, query);
      });

      this.results = true;

      // console.log(this.books);
    } else {
      this.bookListService.getBooks().subscribe((data: Book[]) => {
        this.books = data.filter(book => {
          return this.bookMatched(book, query);
        });
      });
    }
  }

  bookMatched(book: Book, query: string): Boolean {
    if (book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) return true;
    if (book.author.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1) return true;
    if (book.author.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1) return true;
    return false;
  }

  loadBooks() {
    this.bookListService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      if (this.results) this.results = false;
      // console.log(this.books);

      // this.handleNew(); // for form layout testing
    });
  }
}
