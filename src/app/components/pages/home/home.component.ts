import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {Account} from "../../../authentication/account.model";
import {AccountService} from "../../../authentication/service/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allComponents: any = []
  locations: any = []
  components: any = []
  currentAccount: Account | null | undefined;

  constructor(private HomeService: HomeService, public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.HomeService.getComponents().subscribe(components => {
      this.allComponents = components
      this.components = this.allComponents.filter((component: any) => {
        return component?.componentId != 'HEADER' && component?.componentId != 'TRUSTEDBY' && component?.componentId != 'SUPERCOMPANIES'
      })

    })
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account
    })
  }

}
