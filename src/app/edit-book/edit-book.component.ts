import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from '../book';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent {
  formGroup!: FormGroup;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the book ID from the route
    this.bookId = +this.route.snapshot.paramMap.get('id')!;

    // Initialize form
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      auther: ['', Validators.required],
      genre: ['', Validators.required],
      publishedYear: ['', [Validators.required, Validators.min(0)]],
    });

    // Fetch the book data and populate the form
    this.bookService.GetAll().subscribe((books) => {
      const book = books.find((b) => b.id === this.bookId);
      if (book) {
        this.formGroup.patchValue(book);
      }
    });
  }

  // Update book
  submit(): void {
    if (this.formGroup.valid) {
      const updatedBook: Book = this.formGroup.value;
      updatedBook.id = this.bookId;
      this.bookService.UpdateBook(updatedBook).subscribe({
        next: () => {
          alert('Book updated successfully!');
          this.router.navigate(['/']); // Navigate back to the list
        },
        error: (err) => {
          console.error('Error updating book:', err);
        },
      });
    }
  }
}
