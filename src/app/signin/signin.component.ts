import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { MessaginService } from '../messagin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true;
  signinForm = new FormGroup({
    email : new FormControl("", [Validators.required, Validators.email]),
    psw : new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    private auth: AuthService,
    public msg: MessaginService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void{
      if(this.signinForm.valid){
          this.auth.signIn(this.signinForm.value)
          .then(result=>{
            console.log(result);
            this.dialogRef.close(result);
          })
          .catch(error=>{
            console.error(error);
            this.dialogRef.close(error);
          });
      }
  }

  ngOnInit(): void {
  }

}
