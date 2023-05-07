import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../../service/account.service";
import {SignInService} from "../../service/sign-in.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppConstants} from "../../../config/app.constants";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css'],
})
export class SignInModalComponent implements OnInit {
  @ViewChild('username', {static: false})
  username!: ElementRef;

  authenticationError = false;
  passwordError = false;
  showModal: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private loginService: SignInService,
              public router: Router,
              public http: HttpClient,
              public toasterService: ToastrService) {

  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: response => {
          this.processError(response)
        }
      });
  }
  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.title === "username does not exist") {
      this.toasterService.error("Username Doesn't Exist! Please use another one!");
    } else if (response.status === 400 && response.error.title === "wrong password") {
      this.toasterService.error("Wrong Password! Please use another one!");
    } else if (response.status === 400 && response.error.title === "Email not activated") {
      this.toasterService.error("Email not activated! Please activate your email!");
    } else {
      this.toasterService.error("Login failed! Please try again later.");
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }
  }

}
