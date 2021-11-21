import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from '../../services/auth.service';
import { MessaginService } from '../../services/messagin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true;
  signinForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    psw: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    private _auth: AuthService,
    public msg: MessaginService
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onOkClick(): Promise<void> {
    if (this.signinForm.valid) {
      const credentials = await this._auth.signIn(this.signinForm.value); 
      this.dialogRef.close(credentials);
    }
  }
}
