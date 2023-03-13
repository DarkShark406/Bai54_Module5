import { Component, Input } from '@angular/core';
import { BookAPIService } from 'src/app/services/book-api.service';
import { Book } from 'src/app/interfaces/Book';
import { finalize, Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
})
export class BookNewComponent {
  book = new Book();
  books: any;
  errMessage: string = '';

  @Input() requiredFileType: any;
  fileName = '';
  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();

  constructor(private _service: BookAPIService, private http: HttpClient) {}

  postBook() {
    const now = new Date();
    const date = now.toLocaleDateString(); // Lấy ngày hiện tại dưới dạng dd/mm/yyyy
    const time = now.toLocaleTimeString(); // Lấy giờ hiện tại dưới dạng hh:mm:ss
    this.book.createAt = `${date} - ${time}`;
    this.book.updateAt = `${date} - ${time}`;

    this._service.postBook(this.book).subscribe({
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

    let str = this.book.coverImage;
    let arr = str.split('\\');
    this.book.coverImage = arr[arr.length - 1];
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }
}
