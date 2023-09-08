import { Component, OnInit } from '@angular/core';
import {AccountService} from "../service/account.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.queryParams.pipe().subscribe(params => {if (params['key']) {
       this.accountService.activateAccount(params['key']).subscribe();
    }})
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

}
