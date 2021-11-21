import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/modules/profile.class';
import { MessaginService } from '../services/messagin.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile!: Profile | undefined;

  constructor(
    private _store: StoreService
  ) { }

  async ngOnInit(): Promise<void> {
    const profile = await this._store.getProfile();
    if (profile && 'setup' in profile && profile.setup) {
      this.profile = new Profile(profile);
    } else {
      this.editProfile();
    }
  }

  async editProfile() {
    const profile = await this._store.openSetup(this.profile);
    if (profile) {
      this.profile = profile;
    }
  }
}
