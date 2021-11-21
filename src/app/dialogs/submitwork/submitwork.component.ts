import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store.service';
import { Profile } from 'src/modules/profile.class';
import { Room } from 'src/modules/room.class';
import { SubmitWork } from 'src/modules/submitwork.class';

@Component({
  selector: 'app-submitwork',
  templateUrl: './submitwork.component.html',
  styleUrls: ['./submitwork.component.scss']
})
export class SubmitworkComponent implements OnInit {

  profile!: Profile;
  submitWork!: SubmitWork;
  submitWorkForm!: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<SubmitworkComponent>,
  ) { }

  ngOnInit(): void {
    if (this.profile) {
      this.submitWorkForm = new FormGroup({
        date: new FormControl('', [Validators.required]),
        workTime: new FormControl('', [Validators.required]),
        roomsCount: new FormArray(this.profile.rooms.map((room: Room) => this.createRoomCount(room)))
      });
    } else {
      //SHOULD NOT LAND HERE. NOT SIGN IN OR NO PROFILE
    }

  }

  getRoomsCountControls(): FormGroup[] {
    const roomsCount = this.submitWorkForm.get('roomsCount') as FormArray;
    return roomsCount.controls as FormGroup[];
  }

  createRoomCount(room: Room): FormGroup {
    return new FormGroup({
      count : new FormControl('', Validators.required),
      room: new FormControl(room.toJSON(), Validators.nullValidator)
    });
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onOkClick(): void {
    if (this.submitWorkForm.valid) {
      console.log(this.submitWorkForm.value);
      this.submitWork = new SubmitWork(this.submitWorkForm.value, this.profile.customId);
      console.log(this.submitWorkForm);
      this._dialogRef.close(this.submitWork);
    }
  }

}
