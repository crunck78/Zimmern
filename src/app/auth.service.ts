import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  dummies = {
    user: {
      id: "sdlkjflskpoadksölfdsmfmsdmfs",
      earningsPerHour: 0,
      setUp: false,
      rooms: []
    }
  }

  user: any;
  constructor(
    private auth: AngularFireAuth,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.auth
      .onAuthStateChanged(
        (result) => {
          this.user = result;
        },
        (error) => {
          console.error(error);
        },
      );
  }

  // async isSignIn() {
  //   return await this.auth.authState.pipe(first()).toPromise();
  // }

  openSignIn() {
    const dialogRef = this.dialog.open(SigninComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        this._snackBar.open(result, "Ok");
      }

    });
  }

  openSignUp() {
    const dialogRef = this.dialog.open(SignupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        this._snackBar.open(result, "Ok");
      }
    });
  }

  signIn(value: any): Promise<any> {
    return this.auth.signInWithEmailAndPassword(value.email, value.psw);
  }

  signUp(value: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(value.email, value.psw);
  }

  signOut(): void {
    this.auth.signOut();
  }
}
