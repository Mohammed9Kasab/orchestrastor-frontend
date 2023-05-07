import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetInitModalComponent } from './password-reset-init-modal.component';

describe('PasswordResetInitModalComponent', () => {
  let component: PasswordResetInitModalComponent;
  let fixture: ComponentFixture<PasswordResetInitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetInitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetInitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
