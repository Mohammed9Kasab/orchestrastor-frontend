import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {AccountService} from "../../authentication/service/account.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          this.router.navigate(['']);
          return false;
        }

        return true;

      })
    );
  }



}
