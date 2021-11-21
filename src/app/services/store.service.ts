import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/compat';
import { Profile } from 'src/modules/profile.class';
import { SetupComponent } from '../dialogs/setup/setup.component';
import { AuthService } from './auth.service';
import { MessaginService } from './messagin.service';
import { first } from 'rxjs/operators';
import { SubmitworkComponent } from '../dialogs/submitwork/submitwork.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit {
  profile!: Profile;

  constructor(
    private _store: AngularFirestore,
    private _dialog: MatDialog,
    private _msg: MessaginService,
    private _auth: AuthService) { }

  ngOnInit(): void {

  }

  async getProfile(): Promise<any | undefined> {
    return this._store
      .collection('profiles')
      .doc(this._auth.user?.uid)
      .valueChanges({ idField: 'customId' })
      .pipe(first()).toPromise();
  }

  async setProfile(): Promise<void> {
    return this._store
      .collection('profiles')
      .doc(this._auth.user?.uid)
      .set(this.profile.toJSON());
  }

  async openSetup(profile: Profile | undefined) {
    const dialogRef = this._dialog.open(SetupComponent);
    dialogRef.componentInstance.profile = profile;

    const result = await dialogRef.afterClosed().pipe(first()).toPromise();
    if (result) {
      this.profile = result;
      await this.setProfile();
    }
    return result;
  }

  async getSubmitWorks() : Promise<any[]>{
    return this._store
    .collection('submitworks', ref=> ref.where('author', '==', this._auth.user?.uid))
    .valueChanges({ idField: 'customId' })
    .pipe(first()).toPromise();
  }

  setSubmitWork(submitwork : any) : Promise<DocumentReference<unknown>>{
    return this._store
    .collection('submitworks')
    .add(submitwork.toJSON());
  }

  async openSubmitWork(profile : Profile) {
    const dialogRef = this._dialog.open(SubmitworkComponent);
    dialogRef.componentInstance.profile = profile;

    const result = await dialogRef.afterClosed().pipe(first()).toPromise();
    if (result) {
     await this.setSubmitWork(result);
    }
    return result;
  }
}
