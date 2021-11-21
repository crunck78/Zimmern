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
    psw: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirm_psw: new FormControl("", [Validators.required])
  }, this.passwordConfirming());

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private _auth: AuthService,
    public msg: MessaginService
  ) { }

  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe(() => {
      console.log(this.signupForm.hasError('passwordNotMatching'));
    });
  }

  passwordConfirming(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const psw = control.get('psw');
      const confirm_psw = control.get('confirm_psw');
      const notMatching = psw?.value !== confirm_psw?.value && psw?.dirty && confirm_psw?.dirty;
      return notMatching ? { passwordNotMatching: true } : null;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onOkClick(): Promise<void> {
    if (this.signupForm.valid) {
      const credentials = await this._auth.signUp(this.signupForm.value);
    }

  }

  async completeSingUp() {
      return await this._auth.signUp(this.signupForm.value);
  }
}
