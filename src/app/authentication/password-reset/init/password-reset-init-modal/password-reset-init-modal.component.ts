import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PasswordResetInitService} from "../../../service/password-reset-init.service";

@Component({
  selector: 'app-password-reset-init-modal',
  templateUrl: './password-reset-init-modal.component.html',
  styleUrls: ['./password-reset-init-modal.component.css']
})
export class PasswordResetInitModalComponent implements AfterViewInit {
  @ViewChild('email', { static: false })
  email?: ElementRef;
  success = false;
  showMsg = false;
  inputsFilledError = false;

  resetPasswordInitForm = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(254), Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
  });
  constructor(private passwordResetInitService: PasswordResetInitService,private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    if (this.email) {
      this.email.nativeElement.focus();
    }
  }
resetPasswordInit() {
    if(!this.resetPasswordInitForm.invalid) {
      this.passwordResetInitService.save(this.resetPasswordInitForm.get(['email'])!.value).subscribe(() => (this.success = true, this.showMsg = true));
    } else {
      this.inputsFilledError = true;
    }
  }
}
