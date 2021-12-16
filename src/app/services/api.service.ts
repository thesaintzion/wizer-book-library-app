import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiData } from '../models/models';
import { Book, Category } from '../_shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiUrl: string = 'https://61167dbc1c592d0017bb7f4c.mockapi.io';




  constructor(private http: HttpClient) { }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  getBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/books`).pipe(retry(5), catchError(this.handleError));
  }

  addBook(data: ApiData) {
    return this.http.post<any>(`${this.apiUrl}/books`, data).pipe(retry(5), catchError(this.handleError));
  }

  editBook(data: ApiData, id: string) {
    return this.http.put<any>(`${this.apiUrl}/books/${id}`, data).pipe(retry(5), catchError(this.handleError));
  }

  deleteBook(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/books/${id}`).pipe(retry(5), catchError(this.handleError));
  }




  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(retry(5), catchError(this.handleError));
  }

  addCategory(data: ApiData) {
    return this.http.post<any>(`${this.apiUrl}/categories`, data).pipe(retry(5), catchError(this.handleError));
  }

  editCategory(data: ApiData, id: string) {
    return this.http.put<any>(`${this.apiUrl}/categories/${id}`, data).pipe(retry(5), catchError(this.handleError));
  }

  deleteCategory(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`).pipe(retry(5), catchError(this.handleError));
  }
}
