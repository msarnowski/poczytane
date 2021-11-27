import { Component, OnInit } from '@angular/core';

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
  editedBookId?: number;
  books: Book[];

  constructor() {
    this.editing = false;
    this.adding = false;
    // this.editedBookId = 0;

    this.books = [{
      id: 0,
      date: "2021-10-09T18:24:00.000Z",
      title: "Oskarżona Wiera Gran",
      author: {
        firstName: "Agata",
        lastName: "Tuszyńska"
      },
      quotes: ["bla bla bla"],
      note: "eue eue eue"
    },{
      id: 1,
      date: "2021-10-10T18:24:00.000Z",
      title: "Kajś",
      author: {
        firstName: "Zbigniew",
        lastName: "Rokita"
      },
      quotes: ["hue hue hue", "buch buch buch"],
      note: "xxx yyy zzz"
    },{
      id: 2,
      date: "2021-10-11T18:24:00.000Z",
      title: "Fantom bólu",
      author: {
        firstName: "Hanna",
        lastName: "Krall"
      },
      quotes: undefined,
      note: "ble ble ble"
    }];
  }

  ngOnInit(): void {}

  handleNew() {
    this.adding = true;
    this.editing = true;
  }

  handleEditing(id: number) {
    this.editedBookId = id;
    this.editing = true;
  }

  handleCancel() {
    this.editing = false;
    this.adding = false;
  }

  handleSave(event: Book) {
    // console.log(event); 
    if (this.adding) {
      this.books.push(event);
    } else {
      this.books = this.books.map((book: Book) => {
        if (event.id === book.id) {
          book = Object.assign({}, book, event);
        }
        return book;
      });
    }
    
    this.editing = false;
    this.adding = false;
  }

}
