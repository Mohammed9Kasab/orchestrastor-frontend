import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    termsConditionsCheck: [false, [Validators.requiredTrue]]
  });

  constructor(private registerService: RegisterService, private fb: FormBuilder, private toasterService: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      const firstName = this.registerForm.get(['firstName'])?.value;
      const lastName = this.registerForm.get(['lastName'])?.value;
      if(!this.registerForm.invalid) {
        this.registerService
          .save({ firstName, lastName, login, email, password, langKey: 'en' })
          .subscribe({ next: () => {
            this.success = true;
            this.registerForm.reset();
            },
            error: response => {
              this.processError(response)
            }
          });
      } else {
        this.toasterService.error("Please fill all fields!");
      }
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.title === "Login name already used!") {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.title === "Email is already in use!") {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

}
