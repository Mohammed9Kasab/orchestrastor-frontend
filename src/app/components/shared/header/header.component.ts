import {Component, HostListener, Input} from '@angular/core';
import {HelperService} from '../../helper/helper.service';
import {AccountService} from "../../../authentication/service/account.service";
import {AuthServerProvider} from "../../../authentication/service/auth-jwt.service";
import {SignInService} from "../../../authentication/service/sign-in.service";
import {Router} from "@angular/router";
import {Account} from "../../../authentication/account.model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() selectedNav: any[] = [];
  navMethod: boolean = false;
  @Input() currentAccount: Account | null | undefined;

  toggleNav() {
    this.navMethod = !this.navMethod;
  }

  open: boolean = false;

  trigger(item: { open: boolean; }) {
    item.open = !item.open;
  }

  constructor(private signInService: SignInService, private accountService: AccountService, private authService: AuthServerProvider, private helperService: HelperService, private router: Router) {
  }

  ngOnInit(): void {
  }

  windowScrolled: boolean | undefined;

  // Sticky Nav
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.windowScrolled = window.scrollY > 100;
  }






  logout() {
    this.signInService.logout();
    this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
  }
}

