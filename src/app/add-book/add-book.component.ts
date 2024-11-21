import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book } from '../model/book.model';
import { BookService } from '../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'], // Fixed `styleUrls`
})
export class AddBookComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({}); // Initialized with an empty object

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    // Corrected FormControl syntax
    this.formGroup = this.fb.group({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required), // Renamed from 'auther'
      genre: new FormControl('', Validators.required),
      publishedYear: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      console.error('Form is invalid');
      return;
    }

    const book: Book = {
      title: this.formGroup.value['title'],
      auther: this.formGroup.value['author'], // Updated key
      genre: this.formGroup.value['genre'],
      publishedYear: this.formGroup.value['publishedYear'],
    };

    this.bookService.AddBook(book).subscribe({
      next: (response) => {
        console.log('Book added successfully', response);
        this.formGroup.reset(); // Reset form after successful submission
      },
      error: (error) => {
        console.error('Error adding book', error);
      },
    });
  }
}
