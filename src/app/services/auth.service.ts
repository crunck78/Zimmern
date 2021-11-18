import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninComponent } from '../dialogs/signin/signin.component';
import { SignupComponent } from '../dialogs/signup/signup.component';


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

  user!: firebase.User | null;
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

  openSignIn(): void {
    const dialogRef = this.dialog.open(SigninComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        this._snackBar.open(result, "Ok");
      }
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(SignupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        this._snackBar.open(result, "Ok");
      }
    });
  }

  signIn(value: any): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(value.email, value.psw);
  }

  signUp(value: any): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(value.email, value.psw);
  }

  signOut(): void {
    this.auth.signOut();
  }
}
