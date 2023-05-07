import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActivationService} from "../../service/activation.service";

@Component({
  selector: 'app-activation-modal',
  templateUrl: './activation-modal.component.html',
  styleUrls: ['./activation-modal.component.css']
})
export class ActivationModalComponent implements OnInit {
  @ViewChild('activate', {static: false})
  activate?: ElementRef;

  initialized = false;
  success = false;
  key = '';

  constructor(private route: ActivatedRoute, private router: Router, private activateService: ActivationService) {
  }

  ngOnInit(): void {

    this.initialized = true;
    this.route.queryParams.subscribe(params => {
      if (params['key'] && params['key'].length == 20) {
        this.key = params['key'];
        this.activateService.get(this.key).subscribe({
          next: () => {
            this.success = true
          }
        })
        this.initialized = true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
