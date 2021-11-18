import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MessaginService } from '../../services/messagin.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  signupForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    psw: new FormControl("paswword", [Validators.required, Validators.minLength(8)]),
    confirm_psw: new FormControl("", [Validators.required])
  }, this.passwordConfirming());

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private auth: AuthService,
    private store: StoreService,
    public msg: MessaginService
  ) { }

  ngOnInit(): void {
  }

  passwordConfirming(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const notMatching = control.get('psw')?.value !== control.get('confirm_psw')?.value;
        return notMatching ? {passwordNotMatching: true} : null;
      };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (this.signupForm.valid) {
      this.auth.signUp(this.signupForm.value)
        .then(result => {
          console.log(result);
          //this.store.addProfile(result);
          this.dialogRef.close(result);
        })
        .catch(error => {
          console.error(error);
          this.dialogRef.close(error);
        });
    }
  }
}
