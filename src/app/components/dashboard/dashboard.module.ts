import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
import { FavBooksComponent } from './fav-books/fav-books.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { AddBookComponent } from './_dialogs/add-book/add-book.component';
import { PageWithTableComponent } from './page-with-table/page-with-table.component';

@NgModule({
  declarations: [
    DashboardRootComponent,
    BooksComponent,
    CategoriesComponent,
    FavBooksComponent,
    DashboardRootComponent, AddBookComponent, PageWithTableComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],

  entryComponents: [AddBookComponent]
})
export class DashboardModule { }
