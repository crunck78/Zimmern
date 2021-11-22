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
    confirm_psw: new FormControl("", [Validators.required, this.passwordNotmatching()]),
    psw: new FormControl("", [Validators.required, Validators.minLength(8) ]),
  });

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private _auth: AuthService,
    public msg: MessaginService
  ) { }

  ngOnInit(): void {

  }

  passwordNotmatching(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const psw = control.parent?.get('psw');
      const notMatching = psw?.value !== control?.value && psw?.dirty && control?.dirty;
      return notMatching ? { passwordNotMatching: true } : null;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onOkClick(): Promise<void> {
    if (this.signupForm.valid) {
      try {
        const credentials = await this._auth.signUp(this.signupForm.value);
        this.dialogRef.close(credentials);
      } catch (error : any) {
        if(error.code === 'auth/email-already-in-use') this.msg.show('Email already in Use!');
        else this.msg.show(error.message);
      }
    }

  }
}
