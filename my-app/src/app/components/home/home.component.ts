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

  showModal() {
    const deleteCourseModal = document.getElementById('delete-course-modal');
    if (deleteCourseModal) {
      deleteCourseModal.classList.add('show');
    }
  }

  hideModal() {
    const deleteCourseModal = document.getElementById('delete-course-modal');
    if (deleteCourseModal) {
      deleteCourseModal.classList.remove('show');
    }
  }

  saveSelectedBook(bookId: string) {
    this.selectedBook = bookId;
    this.showModal();
  }

  deleteBook() {
    this._service.deleteBook(this.selectedBook).subscribe({
      next: (data) => (this.books = data),
      error: (err) => (this.errMessage = err),
    });

    this.hideModal();
  }
}
