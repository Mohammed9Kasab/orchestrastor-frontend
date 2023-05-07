import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServerProvider} from "./authentication/service/auth-jwt.service";
import {AccountService} from "./authentication/service/account.service";
import {HelperService} from "./components/helper/helper.service";
import {Account} from "./authentication/account.model";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})
export class AppComponent implements OnInit {
  cookieValue: string | undefined;
  selectedNav: any[] = [];
  currentAccount: Account | null | undefined;

  constructor(private titleService: Title, private breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
              private jwtService: AuthServerProvider, private router: Router, private accountService: AccountService,
              private helperService: HelperService,private cookieService:CookieService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
      this.titleService.setTitle(this.createTitle(crumbs));
    });
    this.cookieValue = this.cookieService.get('cookie-name')
  }
  setCookie(){
    this.cookieService.set('cookie-name','our cookie value')
    this.cookieValue=this.cookieService.get('cookie-name')
  }
  checkRoles(): void {
    this.accountService.identity().subscribe(identity => {
      this.currentAccount = identity;
      if (this.accountService.hasAnyAuthority("ROLE_LOCATION_USER")) {
        this.selectedNav = this.helperService.locationNavigation
      } else if (this.accountService.hasAnyAuthority("ROLE_USER") || this.accountService.hasAnyAuthority("ROLE_LOCATION_USER")) {
        this.selectedNav = this.helperService.userTwoNavigation
      } else {
        this.selectedNav = this.helperService.userNavigation
      }
    });
  }

  onActivate(_event:any){
    window.scroll(0,0);
    this.checkRoles();
  }
  private createTitle(routesCollection: Breadcrumb[]) {
    const title = "Travel To Desk";
    const titles = routesCollection.filter((route) => route.displayName);

    if (!titles.length) { return title; }

    const routeTitle = this.titlesToString(titles);
    return `${routeTitle}${title}`;
  }

  private titlesToString(titles: any[]) {
    return titles.reduce((prev, curr) => {
      return `${curr.displayName} | `;
    }, '');
  }
}
