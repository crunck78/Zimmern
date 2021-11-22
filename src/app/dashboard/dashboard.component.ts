import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/modules/profile.class';
import { SubmitWork } from 'src/modules/submitwork.class';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile!: Profile;
  submitWorks!: SubmitWork[];

  constructor(private _store: StoreService) { }

  async ngOnInit(): Promise<void> {
    const profile = await this._store.getProfile();
    this.profile = new Profile(profile);
    const submitWorks = await this._store.getSubmitWorks();
    this.submitWorks = submitWorks.map(sw => new SubmitWork(sw, this.profile.customId));
    console.log(submitWorks);
  }

  async openSubmitWork() {
    const submitWork = await this._store.openSubmitWork(this.profile);
    if (submitWork) {
        this.submitWorks.push(submitWork);
    }
  }

  getAllocWorkTime(sw : SubmitWork){
    const allocTime = sw.getAllocWorkTime();
    const hh = Math.round( allocTime / 60);
    const rest = allocTime % 60;
    return rest > 0 ? `${hh} hourse and ${rest} minutes` : `${hh} hourse`;
  }

}
