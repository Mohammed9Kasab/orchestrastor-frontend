import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../authentication/service/account.service";
import {Account} from "../../../authentication/account.model";
import {HelperService} from "../../helper/helper.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordResetFinishService} from "../../../authentication/service/password-reset-finish.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  active = 1;
  currentAccount!: Account | null;
  editUser!: FormGroup;
  user!: User;
  isSaving = false;
  unique = false;

  @ViewChild('newPassword', {static: false})
  newPassword?: ElementRef;

  initialized = false;
  doNotMatch = false;
  error = false;
  errorCredentials = false;
  success = false;
  successCredentials = false;
  successPicture = false;
  errorPicture = false;
  key = '';
  discountCode: string | undefined =''
  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    currentPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  constructor(protected accountService: AccountService, private helperService: HelperService, private fb: FormBuilder,
              private userService: UserService, private router: Router, private route: ActivatedRoute,
              private passwordResetFinishService: PasswordResetFinishService,
              private toasterService: ToastrService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initialized = true;
    this.editUser = new FormGroup({
      id: new FormControl(),
      login: new FormControl(),
      firstName: new FormControl('', [Validators.required]),
      cui: new FormControl(''),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.pattern("[0-9]{10}")]),
      activated: new FormControl(),
      langKey: new FormControl(),
      authorities: new FormControl(),
    });
    this.getCurrentUser();
  }

  protected updateForm(user: Account | null): void {

    this.editUser?.patchValue({
      login: user?.login,
      firstName: user?.firstName,
      cui: user?.cui,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      imageUrl: user?.imageUrl,
      langKey: user?.langKey,
      activated: user?.activated,
      authorities: user?.authorities
    })
  };

  private updateUser(user: Account | null): void {
    user!.firstName = this.editUser.get(['firstName'])?.value;
    user!.lastName = this.editUser.get(['lastName'])?.value;
    user!.cui = this.editUser.get(['cui'])?.value;
    user!.email = this.editUser.get(['email'])?.value;
    user!.phoneNumber = this.editUser.get(['phoneNumber'])?.value;

  }


  save(): void {
    this.isSaving = true;
    this.updateUser(this.currentAccount);
    if(this.editUser.valid){
      this.subscribeToSaveResponse(this.accountService.save(this.currentAccount));
    }else{
      this.toasterService.error("Fields must be filled in!")
    }

  }

  protected subscribeToSaveResponse(result: Observable<User>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.successCredentials = true
    this.toasterService.success("Data has been changed successfully.")
  }

  protected onSaveError(): void {
    this.unique = true;
    this.isSaving = false;
    this.errorCredentials = true;
    this.toasterService.error("The email has already been taken!")
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }


  finishReset(): void {
    this.doNotMatch = false;
    this.error = false;

    const newPassword = this.passwordForm.get(['newPassword'])!.value;
    const confirmPassword = this.passwordForm.get(['confirmPassword'])!.value;
    const currentPassword = this.passwordForm.get(['currentPassword'])!.value;
    if (newPassword !== confirmPassword) {
      this.doNotMatch = true;
      this.toasterService.error("The password and its confirmation do not match!")
    } else {
      this.passwordResetFinishService.RestPassword(currentPassword, newPassword).subscribe({
        next: () => (this.success = true,
          this.toasterService.success("Your password has been reset."),
            this.passwordForm.reset()),
        error: () => (this.error = true,
          this.toasterService.error("Invalid current password!"))
      });
    }
  }

  getCurrentUser() {
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account
      this.updateForm(this.currentAccount);
    });
  }
  getContentLength(formData:any) {
    const formDataEntries = [...formData.entries()]

    const contentLength = formDataEntries.reduce((acc, [key, value]) => {
      if (typeof value === 'string') return acc + value.length
      if (typeof value === 'object') return acc + value.size

      return acc
    }, 0)

    return contentLength
  }

  // updateProfilePicture(event: any) {
  //   const file = event.target.files[0];
  //   let formData = new FormData();
  //
  //   const stringifiedJson = JSON.stringify({
  //     userDTO: {
  //       id: this.currentAccount?.id,
  //       login: this.currentAccount?.login
  //     }
  //   })
  //
  //   formData.append("file", file, file.name);
  //   formData.set("gallery", new Blob([stringifiedJson], {
  //     type: 'application/json'
  //   }));
  //
  //
  //   if(this.getContentLength(formData) > 5240000 ){
  //     this.toasterService.error("Picture size must not exceed 5MB")
  //   }
  //
  //   this.galleryService.uploadPicture(formData).subscribe(result => {
  //     // @ts-ignore
  //     this.currentAccount?.imageUrl=Object.values(result.body)[0]
  //     if (result.status === 400) {
  //       this.toasterService.error("Picture size must not exceed 5MB")
  //     }
  //      this.toasterService.success("Profile picture has been changed successfully.")
  //
  //   });
  //
  // }
}
