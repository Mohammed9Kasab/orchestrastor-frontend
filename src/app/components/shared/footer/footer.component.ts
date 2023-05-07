import {Component, HostListener} from '@angular/core';
import { HelperService } from '../../helper/helper.service';
import instagram from "../../data/instagram.json";
import {AuthServerProvider} from "../../../authentication/service/auth-jwt.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public insta:any[] = instagram;

  windowScrolled : boolean | undefined;
  // Sticky Nav
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.windowScrolled = window.scrollY > 100;
  }
}
