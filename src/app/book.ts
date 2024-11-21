import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _endpoint = 'https://localhost:7016/api/Book';

  constructor(private _http: HttpClient) {}

  GetAll() {
    return this._http.get<Book[]>(this._endpoint);
  }

  AddBook(book: Book) {
    return this._http.post(this._endpoint, book);
  }

  // Update an existing book
  UpdateBook(book: Book) {
    return this._http.put(`${this._endpoint}`, book);
  }

  // Delete a book by ID
  DeleteBook(bookId: number) {
    return this._http.delete<void>(`${this._endpoint}/${bookId}`);
  }
}
