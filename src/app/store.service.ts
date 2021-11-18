import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit {

  constructor(
    private store: AngularFirestore,
    private auth: AuthService) {
    
  }
  ngOnInit(): void {
    
  }

  getProfile(){
    
  }


}
