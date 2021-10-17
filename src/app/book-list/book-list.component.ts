import { Component, OnInit } from '@angular/core';

interface Book {
  date: string,
  title: string,
  author: Author,
  quotes: string[],
  note: string
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
  books: Book[];

  constructor() {
    this.books = [{
      date: "2021-10-09T18:24:00.000Z",
      title: "Oskarżona Wiera Gran",
      author: {
        firstName: "Agata",
        lastName: "Tuszyńska"
      },
      quotes: ["bla bla bla"],
      note: "ble ble ble"
    },{
      date: "2021-10-10T18:24:00.000Z",
      title: "Kajś",
      author: {
        firstName: "Zbigniew",
        lastName: "Rokita"
      },
      quotes: ["hue hue hue", "buch buch buch"],
      note: "ech ech ech"
    },{
      date: "2021-10-11T18:24:00.000Z",
      title: "Fantom bólu",
      author: {
        firstName: "Hanna",
        lastName: "Krall"
      },
      quotes: ["wii wii wii"],
      note: "eue eue eue"
    }];
  }

  ngOnInit(): void {
  }

}
