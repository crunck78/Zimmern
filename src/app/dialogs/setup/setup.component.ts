import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/modules/profile.class';
import { Room } from 'src/modules/room.class';
import { MessaginService } from '../../services/messagin.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  profile!: Profile | undefined;
  hide = true;
  rooms!: FormArray;
  setupForm!: FormGroup;

  constructor(
    public msg: MessaginService,
    private _dialogRef: MatDialogRef<SetupComponent>
  ) {

  }

  ngOnInit(): void {
    if (this.profile) {
      this.setupForm = new FormGroup({
        income: new FormControl(this.profile.income, [Validators.required]),
        rooms: new FormArray(this.profile.rooms.map(room => this.createRoom(room)))
      });
    } else {
      this.setupForm = new FormGroup({
        income: new FormControl('', [Validators.required]),
        rooms: new FormArray([this.createRoom(new Room())])
      });
    }
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onOkClick(): void {
    if (this.setupForm.valid) {
      console.log(this.setupForm.value);
      this.profile = new Profile(this.setupForm.value);
      this.profile.setup = true;
      this._dialogRef.close(this.profile);
    }
  }

  addRoom() {
    this.rooms = this.setupForm.get('rooms') as FormArray;
    this.rooms.push(this.createRoom(new Room()));
  }

  getRoomsControls(): FormGroup[] {
    this.rooms = this.setupForm.get('rooms') as FormArray;
    return this.rooms.controls as FormGroup[];
  }

  createRoom(room: Room): FormGroup {
    return new FormGroup({
      type: new FormControl(room.type, Validators.required),
      minutes: new FormControl(room.minutes, Validators.required)
    });
  }

  removeRoom(i: number) {
    this.rooms = this.setupForm.get('rooms') as FormArray;
    if (this.rooms.length > 1) {
      this.rooms.removeAt(i);
      console.log(i);
    }
  }

}
