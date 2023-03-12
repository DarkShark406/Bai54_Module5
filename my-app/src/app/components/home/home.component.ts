import { Component } from '@angular/core';
import { BookAPIService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  books: any;
  errMessage: string = '';

  selectedBook: string = '';

  constructor(private _service: BookAPIService) {
    this._service.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => (this.errMessage = err),
    });
  }

  saveSelectedBook(bookId: string) {
    this.selectedBook = bookId;
  }

  deleteBook() {
    this._service.deleteBook(this.selectedBook).subscribe({
      next: (data) => (this.books = data),
      error: (err) => (this.errMessage = err),
    });

    const deleteModal = document.getElementById('delete-course-modal');
    if (deleteModal) {
      deleteModal.classList.remove('show');
    }

    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('show');
    }
  }
}
