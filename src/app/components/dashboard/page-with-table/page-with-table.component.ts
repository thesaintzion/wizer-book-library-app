import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/_shared/interfaces';

@Component({
  selector: 'app-page-with-table',
  templateUrl: './page-with-table.component.html',
  styleUrls: ['./page-with-table.component.scss']
})
export class PageWithTableComponent implements OnInit {
@Input() tableData: Book[] = [];
@Input() loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
