import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { Book } from './book-list/book-list.component';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get('http://localhost:3000/books').pipe(map(response => response));
    /*[{
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
    }]; */
  }
}
