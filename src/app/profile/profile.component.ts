import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/modules/profile.class';
import { AuthService } from '../auth.service';
import { SetupComponent } from '../setup/setup.component';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile!: Profile;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private store: StoreService
  ) { }
  
  ngOnInit(): void {
    if(!this.profile){
      this.openSetup();
    }
  }

  openSetup() {
    const dialogRef = this.dialog.open(SetupComponent);
    dialogRef.componentInstance.profile = this.profile;

    dialogRef.afterClosed()
      .subscribe((result: Profile | undefined) => {
        if (result) {
          this.profile = result;
          console.log(this.profile);
        }
      });
  }

}
