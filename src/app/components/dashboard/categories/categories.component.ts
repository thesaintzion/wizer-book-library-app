import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { Category } from 'src/app/_shared/interfaces';
import { AddBookComponent } from '../_dialogs/add-book/add-book.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  loading: boolean = true;
  error: boolean = false;
  success: boolean = false;
  categories: Category[] = [];
  notice: string = '';
  public unsubscriber$ = new Subject<void>();


  constructor(private apiService: ApiService, private dialog: MatDialog, private sharedService: SharedService) { }
  getCategories() {
    this.apiService.getCategories().subscribe(
      res => {
        this.loading = false;
        this.error = false;
        this.success = true;
        this.categories = res
      },
      err => {
        this.loading = false;
        this.error = true;
        this.success = false;
      }
    )
  }



  public addCategory(): void {
    let dialogRef = this.dialog.open(AddBookComponent, {
      width: this.sharedService.isHandset ? '100%' : '400px',
      data: { mode: 'create', data: null, type: 'category' },
      position: { bottom: '0' },
      panelClass: ['animated', 'fadeInUp', 'faster', 'dialog-rounded-none'],
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getCategories();
      }
    });
  }


 

  public deleteCategory(category: Category): void {
    this.apiService.deleteCategory(category.id).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        console.log('the data', res);
        this.getCategories();
        this.sharedService.openSnackBar('Category deleted', '', 2000, 'bg-success');
      },
      err => {
        console.log('Login error', err);
        this.notice = err.error.errors[0].message;
        this.sharedService.openSnackBar(this.notice ? this.notice : this.notice, 'Could not delete category. .', 2000, 'bg-danger');
      }
    );
  }

  public editCategory(category: Category): void {
    let dialogRef = this.dialog.open(AddBookComponent, {
      width: this.sharedService.isHandset ? '100%' : '400px',
      position: { bottom: '0' },
      data: { mode: 'edit', data: category, type: 'category' },
      panelClass: ['animated', 'fadeInUp', 'faster', 'dialog-rounded-none'],
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.getCategories();
      }
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }



  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.unsubscribe();
  }

}
