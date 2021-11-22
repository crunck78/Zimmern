import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';

import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../dialogs/signin/signin.component';
import { SignupComponent } from '../dialogs/signup/signup.component';
import { NavigationService } from './navigation.service';
import { MessaginService } from './messagin.service';


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
    private _auth: AngularFireAuth,
    private dialog: MatDialog,
    private _msg: MessaginService,
    private _nav: NavigationService) {
    this._auth
      .onAuthStateChanged(
        (result) => { 
          this.user = result; 
          if(!this.user){
            this._nav.to('');
          }
        },
        (error) => { this._msg.show('AUTH_SERVICE::STATE_CHANGE::ERROR::' + error); }
      );
  }

  ngOnInit(): void {

  }

  openSignIn(): void {
    const dialogRef = this.dialog.open(SigninComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._msg.show('Welcome Back!');
      }
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._msg.show('Welcome!');
      }
    });
  }

  signIn(value: any): Promise<firebase.auth.UserCredential> {
    return this._auth.signInWithEmailAndPassword(value.email, value.psw);
  }

  signUp(value: any): Promise<firebase.auth.UserCredential> {
    return this._auth.createUserWithEmailAndPassword(value.email, value.psw);
  }

  signOut(): void {
    this._auth.signOut()
      .then(() => {
        this._msg.show('Have a nice Day!');
      })
      .catch((error) => {
        this._msg.show(error.message);
      });
  }

  //TODO
  async singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this._auth.signInWithPopup(provider);
    // return this.updateUserData(credential.user);
  }
}
