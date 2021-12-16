import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { Book } from 'src/app/_shared/interfaces';
import { AddBookComponent } from '../_dialogs/add-book/add-book.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fav-books',
  templateUrl: './fav-books.component.html',
  styleUrls: ['./fav-books.component.scss']
})
export class FavBooksComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  error: boolean = false;
  success: boolean = false;
  books: Book[] = [];
  public unsubscriber$ = new Subject<void>();

  constructor(private apiService: ApiService, private dialog: MatDialog, private sharedService: SharedService) { }
  getBooks() {
    this.apiService.getBooks().subscribe(
      res => {
        this.loading = false;
        this.error = false;
        this.success = true;
        this.books = res;
        this.books = this.books.filter(item => item.isFavorite)
      },
      err => {
        this.loading = false;
        this.error = true;
        this.success = false;
      }
    )
  }


  ngOnInit(): void {
    this.getBooks();
  }



  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.unsubscribe();
  }

}
