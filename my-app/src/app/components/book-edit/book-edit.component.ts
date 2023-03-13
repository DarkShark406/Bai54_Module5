import { Component, Input } from '@angular/core';
import { Book } from 'src/app/interfaces/Book';
import { BookAPIService } from 'src/app/services/book-api.service';
import { finalize, Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent {
  book = new Book();
  books: any;
  errMessage: string = '';

  @Input() requiredFileType: any;
  fileName = '';
  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();

  coverImageNew: string = '';

  constructor(private _service: BookAPIService, private http: HttpClient) {
    // Get id of book
    var currentUrl = window.location.href;
    var arr = currentUrl.split('/');
    var id = arr[arr.length - 1];

    this._service.getBookDetails(id).subscribe({
      next: (data) => (this.book = data),
      error: (err) => (this.errMessage = err),
    });
  }

  putBook() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    this.book.updateAt = `${date} - ${time}`;

    if (this.coverImageNew) {
      this.book.coverImage = this.coverImageNew;
    }

    console.log(this.book);

    this._service.putBook(this.book).subscribe({
      next: (data) => (this.books = data),
      error: (err) => (this.errMessage = err),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('image', file);
      const upload$ = this.http
        .post('/upload', formData, {
          reportProgress: true,
          observe: 'events',
          responseType: 'text',
        })
        .pipe(finalize(() => this.reset()));
      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
      });
    }

    let str = this.coverImageNew;
    let arr = str.split('\\');
    this.coverImageNew = arr[arr.length - 1];
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }

  deleteCoverImageNew() {
    this.coverImageNew = '';
    this.fileName = '';
  }
}
