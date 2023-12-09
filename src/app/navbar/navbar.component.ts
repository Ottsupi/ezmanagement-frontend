import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {Observable, map} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  inShop: Boolean = true;
  inReceipt: Boolean = false;

  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent) => {
      if(routerEvent instanceof NavigationEnd) {
          // Get your url
          let route = routerEvent.url;
          if (route == "/") {
            this.inShop = true;
            this.inReceipt = false;
          } else {
            this.inShop = false;
            this.inReceipt = true;
          }
      }
    });
  }
}
