import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { FavBooksComponent } from './fav-books/fav-books.component';

const routes: Routes = [
  {
    path: '', component: DashboardRootComponent, children: [
      { path: '', component: BooksComponent },
      { path: 'books', component: BooksComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'fav-books', component: FavBooksComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }