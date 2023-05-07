import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetFinishModalComponent } from './password-reset-finish-modal.component';

describe('PasswordResetFinishModalComponent', () => {
  let component: PasswordResetFinishModalComponent;
  let fixture: ComponentFixture<PasswordResetFinishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetFinishModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetFinishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
