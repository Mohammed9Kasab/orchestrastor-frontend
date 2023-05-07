import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordResetFinishService} from "../../../service/password-reset-finish.service";

@Component({
  selector: 'app-password-reset-finish-modal',
  templateUrl: './password-reset-finish-modal.component.html',
  styleUrls: ['./password-reset-finish-modal.component.css']
})
export class PasswordResetFinishModalComponent implements OnInit, AfterViewInit {
  @ViewChild('newPassword', { static: false })
  newPassword?: ElementRef;

  initialized = false;
  doNotMatch = false;
  error = false;
  success = false;
  key = '';
  inputsFilledError = false;

  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  });
  constructor(private passwordResetFinishService: PasswordResetFinishService,private route: ActivatedRoute, private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key'] && params['key'].length == 20) {
        this.key = params['key'];
      } else {
        this.router.navigate(['/']);
      }
      this.initialized = true;

    });
  }
  ngAfterViewInit(): void {
    if (this.newPassword) {
      this.newPassword.nativeElement.focus();
    }
  }
  finishReset(): void {
    this.doNotMatch = false;
    this.error = false;

    const newPassword = this.passwordForm.get(['newPassword'])!.value;
    const confirmPassword = this.passwordForm.get(['confirmPassword'])!.value;

    if (newPassword !== confirmPassword) {
      this.doNotMatch = true;
    } else {
      if(!this.passwordForm.invalid) {
        this.passwordResetFinishService.save(this.key, newPassword).subscribe({
          next: () => (this.success = true),
          error: () => (this.error = true),
        });
      } else {
        this.inputsFilledError = true;
      }
    }
  }
}
