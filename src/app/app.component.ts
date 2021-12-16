import { Component } from '@angular/core';
import { OnInit, HostListener } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  audio = false;
  loading = false;
  windowScrolled: boolean = false;

  constructor(public sharedService: SharedService, private router: Router) {
    this.scrollFromTop();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 1200) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }


  scrollFromTop() {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.sharedService.LOADING = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {

          this.sharedService.LOADING = false;
          window.scroll({
            top: 0,
            left: 0,
            // behavior: 'smooth'
          });

          break;
        }
        default: {
          break;
        }
      }
    });
  }

}
