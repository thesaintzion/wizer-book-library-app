import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {  ApiData } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/_shared/interfaces';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss', '../_shared/add-forms.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  unsubscribeApi: Subscription = new Subscription();
  submitted: boolean = false;
  loading: boolean = false;
  success: boolean = false;
  notice: string = '';

  public unsubscriber$ = new Subject<void>();

  localGovernments = [];

  newBook: ApiData = {
    name: '',
    isFavorite: false
  };



  constructor(public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, data: { createdAt: string,
      name: string,
      isFvorite: boolean,
      isFavorite: boolean,
      id: string}, type: string }, private fb: FormBuilder, private apiService: ApiService, private router: Router, private sharedService: SharedService) {

    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      isFavorite: [false],
    }
    )
  }

  get bookControls() { return this.bookForm.controls }



  onSubmit(): void {
    this.submitted = true;
    if (this.bookForm.invalid) {
      this.sharedService.openSnackBar('Please fill in all details', '', 2000, 'bg-danger');
    } else {
      this.loading = true;
      const data: ApiData = {
        ...this.bookForm.value
      }

      if(this.data.type === 'book'){
        if (this.data?.mode === 'edit') {
          this.editBook(data, this.data?.data.id);
        } else {
          this.createBook(data);
        }
      }

      if(this.data.type === 'category'){
        if (this.data?.mode === 'edit') {
          this.editCategory(data, this.data?.data.id);
        } else {
          this.createCategory(data);
        }
      }
    
    }
  }

// TODO..make.functions.reusable
  editBook(data: ApiData, id: string): void {
    this.apiService.editBook(data, id).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.sharedService.openSnackBar('Successful!!', '', 2000, 'bg-success');
        this.dialogRef.close(true);
      },
      err => {
        this.submitted = false;
        this.loading = false;
        this.notice = err.error.errors[0].message;
        this.sharedService.openSnackBar(this.notice ? this.notice : this.notice, 'Could not edit book. .', 2000, 'bg-danger');
        this.dialogRef.close(true);
      }
    );
  }

  createBook(data: ApiData): void {
    this.unsubscribeApi = this.apiService.addBook(data).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.dialogRef.close(true);
        this.sharedService.openSnackBar('Book Created!!', '', 2000, 'bg-success');
      },
      err => {
        this.submitted = false;
        this.loading = false;
        this.notice = err.error.errors[0].message;
        this.sharedService.openSnackBar(this.notice ? this.notice : this.notice, 'Could not create new book. .', 2000, 'bg-danger');
      }
    );
  }

  editCategory(data: ApiData, id: string): void {
    this.apiService.editCategory(data, id).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.sharedService.openSnackBar('Successful!!', '', 2000, 'bg-success');
        this.dialogRef.close(true);
      },
      err => {
        this.submitted = false;
        this.loading = false;
        this.notice = err.error.errors[0].message;
        this.sharedService.openSnackBar(this.notice ? this.notice : this.notice, 'Could not edit category. .', 2000, 'bg-danger');
        this.dialogRef.close(true);
      }
    );
  }

  createCategory(data: ApiData): void {
    this.unsubscribeApi = this.apiService.addCategory(data).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.dialogRef.close(true);
        this.sharedService.openSnackBar('Category Created!!', '', 2000, 'bg-success');
      },
      err => {
        this.submitted = false;
        this.loading = false;
        this.notice = err.error.errors[0].message;
        this.sharedService.openSnackBar(this.notice ? this.notice : this.notice, 'Could not create new category .', 2000, 'bg-danger');
      }
    );
  }


  ngOnInit() {
    if (this.data?.mode === 'edit') {
      this.bookForm.patchValue({
        name: this.data.data.name,
        isFavorite: this.data.data.isFavorite
      })
    }
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.unsubscribe();
  }
}
