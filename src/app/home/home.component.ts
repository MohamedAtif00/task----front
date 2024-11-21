import { Component, OnInit } from '@angular/core';
import { BookService } from '../book';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.GetAll().subscribe((data) => {
      this.books = data;
    });
  }

  deleteBook(bookId: number, index: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.DeleteBook(bookId).subscribe((data) => {
        alert('Book deleted successfully!');
        this.books.splice(index, 1); // Update the UI by removing the book
      });
    }
  }
}
