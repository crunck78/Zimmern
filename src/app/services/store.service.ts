import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { Profile } from 'src/modules/profile.class';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit {
  profile!: {customId : string} | undefined;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService) {
    
  }
  ngOnInit(): void {
    this.store
    .collection('profiles')
    .doc(this.auth.user?.uid)
    .valueChanges({idField: 'customId'})
    .subscribe(
      (profile)=>{
        this.profile = profile;
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  addProfile(result: firebase.auth.UserCredential): void {
    this.store
    .collection('profiles')
    .add(new Profile().toJSON());
  }

  setProfile(){
   
  }
}
