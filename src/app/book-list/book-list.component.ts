import { Component, OnInit } from '@angular/core';

import { BookListService } from '../book-list.service';

export interface Book {
  id: number,
  date: string,
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
  bookToEdit?: Book;
  books?: Book[];
  nextId: number;

  constructor(private bookListService: BookListService) {
    this.editing = false;
    this.adding = false;
    this.nextId = -1;
    // this.editedBookId = 0;
  }

  ngOnInit(): void {
    this.bookListService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  handleNew() {
    if (this.books) {
      this.nextId = Math.max(...this.books.map(b => b.id)) + 1;
      console.log(`nextId: ${this.nextId}`);

      this.adding = true;
      this.editing = true;
    }
  }

  handleEditing(id: number) {
    if (this.books) {
      this.bookToEdit = this.books[id];
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
      });
    } else {
      this.bookListService.updateBook(event).subscribe((data: Book) => {
        this.books = this.books?.map((book: Book) => {
          if (event.id === book.id) {
            book = Object.assign({}, book, event);
          }
          return book;
        });
      });
    }

    this.editing = false;
    this.adding = false;
  }

}
