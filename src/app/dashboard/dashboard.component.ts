import { Component, OnInit } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { Profile } from 'src/modules/profile.class';
import { SubmitWork } from 'src/modules/submitwork.class';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile!: Profile;
  submitWorks!: SubmitWork[];

  constructor(
    private _store: StoreService,
    public auth: AuthService,
    public translate: TranslateService
  ) { }

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

  getRoomsBasedWorkedTime(sw: SubmitWork) {
    const roomsbasedworkedtime = sw.getRoomsBasedWorkedTime();
    const hh = Math.round(roomsbasedworkedtime / 60);
    const rest = roomsbasedworkedtime % 60;

    //return rest > 0 ? `${hh} ${hoursTr} ${andTr} ${rest} ${minutesTr}` : `${hh} ${hoursTr}`;
    return "TEST";
  }

  getRoomsBasedWorkedHours(sw: SubmitWork){
    const roomsbasedworkedtime = sw.getRoomsBasedWorkedTime();
    const hh = Math.floor(roomsbasedworkedtime / 60);
    return hh;
  }

  getRoomsBasedWorkedRest(sw: SubmitWork){
    const roomsbasedworkedtime = sw.getRoomsBasedWorkedTime();
    const rest = roomsbasedworkedtime % 60;

    return rest;
  }

}
