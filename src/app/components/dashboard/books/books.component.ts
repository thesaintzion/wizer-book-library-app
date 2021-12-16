import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { Book } from 'src/app/_shared/interfaces';
import { AddBookComponent } from '../_dialogs/add-book/add-book.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  error: boolean = false;
  success: boolean = false;
  books: Book[] = [];
  notice: string = '';
  public unsubscriber$ = new Subject<void>();

  constructor(private apiService: ApiService, private dialog: MatDialog, private sharedService: SharedService) { }
  getBooks() {
    this.apiService.getBooks().subscribe(
      res => {
        console.log('The res', res);
        this.loading = false;
        this.error = false;
        this.success = true;
        this.books = res
      },
      err => {
        console.log('Error getting agents', err);
        this.loading = false;
        this.error = true;
        this.success = false;
      }
    )
  }


  public addBook(): void {
    let dialogRef = this.dialog.open(AddBookComponent, {
      width: this.sharedService.isHandset ? '100%' : '400px',
      data: { mode: 'create', data: null, type: 'book' },
      position: { bottom: '0' },
      panelClass: ['animated', 'fadeInUp', 'faster', 'dialog-rounded-none'],
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.getBooks();
      }
    });
  }

  public deleteBook(book: Book): void {
    this.apiService.deleteBook(book.id).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        console.log('the data', res);
        this.getBooks();
        this.sharedService.openSnackBar('Book deleted', '', 2000, 'bg-success');
      },
      err => {
        console.log('Login error', err);
        this.notice = err.error.errors[0].message;
        this.sharedService.openSnackBar(this.notice ? this.notice : this.notice, 'Could not delete book. .', 2000, 'bg-danger');
      }
    );
  }

  public editBook(book: Book): void {
    let dialogRef = this.dialog.open(AddBookComponent, {
      width: this.sharedService.isHandset ? '100%' : '400px',
      position: { bottom: '0' },
      data: { mode: 'edit', data: book, type: 'book' },
      panelClass: ['animated', 'fadeInUp', 'faster', 'dialog-rounded-none'],
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.getBooks();
      }
    });
  }

  ngOnInit(): void {
    this.getBooks();
  }



  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.unsubscribe();
  }

}
