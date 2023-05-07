import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


import {AccountService} from "./account.service";
import {Account} from "../account.model";
import {SignIn} from "../sign-in/sign-in-modal/sign-in.model";
import {AuthServerProvider} from "./auth-jwt.service";

@Injectable({ providedIn: 'root' })
export class SignInService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials: SignIn): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
