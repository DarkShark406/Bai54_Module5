import { Component } from '@angular/core';
import { BookAPIService } from 'src/app/services/book-api.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  book: any;
  errMessage: string = '';
  constructor(private _service: BookAPIService) {
    // Get id of book
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/');
    var id = arr[arr.length - 1];

    this._service.getBookDetails(id).subscribe({
      next: (data) => (this.book = data),
      error: (err) => (this.errMessage = err),
    });
  }
}
