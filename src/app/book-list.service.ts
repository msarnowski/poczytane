import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { Book } from './book-list/book-list.component';

const BOOK_API = 'http://localhost:3000/books';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(BOOK_API).pipe(map(response => response));
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${BOOK_API}/${book.id}`, book)
      .pipe(map(response => response));
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(BOOK_API, book)
      .pipe(map(response => response));
  }

  deleteBook(id: number): Observable<unknown> {
    return this.http.delete(`${BOOK_API}/${id}`)
      .pipe(map(response => response));
  }
}
