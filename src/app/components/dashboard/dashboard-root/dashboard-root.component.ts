import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.scss']
})
export class DashboardRootComponent implements OnInit {
  isHandset: boolean = false;
  isHandset$: Observable<boolean>;
  loading = false;
  skeletons: any = [];
  pages = [
    {
      name: 'Categories',
      icon: 'assignment',
      link: 'categories',
      show: true,
    },

    {
      name: 'Fav Books',
      icon: 'favorite_border',
      link: 'fav-books',
      show: true,
    },


  ];

  constructor(private breakpointObserver: BreakpointObserver, private sharedService: SharedService, private router: Router) {

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    for (let i = 0; i <= 7; i++) {
      this.skeletons.push(i)
    }

  }


  closeMen(sidenav: any) {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          return sidenav.toggle();
        } else {
          return null;
        }
      });
  }

  logout() {
    // console
    localStorage.removeItem('LSG');
    this.sharedService.openSnackBar('Goodbye', '', 2000, '');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);

  }

  ngOnInit(): void {

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isHandset = true;
        } else {
          this.isHandset = false;
        }
      });
  }

}
