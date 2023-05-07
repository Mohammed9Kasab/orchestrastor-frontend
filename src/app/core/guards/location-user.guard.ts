import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable, isDevMode} from "@angular/core";
import {AccountService} from "../../authentication/service/account.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LocationUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.identity().pipe(
      map(account => {
        const authorities = account != null ? account.authorities : undefined;
        const isLocationUser = this.isLocationUser(authorities);

        if (account) {
          if (isLocationUser && authorities && this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }

          if (isDevMode()) {
            console.error('User has not any of required authorities: ' + authorities);
          }
          return false;
        }
        return false;
      })
    );
  }

  isLocationUser(authorities: string[] | undefined): boolean {
    let isLocationUser = false;
    if (authorities && authorities !== []) {
      authorities.forEach(element => {
        isLocationUser = element === "ROLE_LOCATION_USER";
      });
    }

    return isLocationUser;
  }
}
