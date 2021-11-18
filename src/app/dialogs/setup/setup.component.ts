import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/modules/profile.class';
import { MessaginService } from '../../services/messagin.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  profile!: Profile;
  hide = true;
  rooms!: FormArray;
  setupForm = new FormGroup({
    income: new FormControl('', [Validators.required]),
    rooms: new FormArray([this.createRoom()])
  });

  constructor(
    public msg: MessaginService,
    private dialogRef: MatDialogRef<SetupComponent>
  ) {

  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (this.setupForm.valid) {
      this.profile = new Profile(this.setupForm.value);
      this.dialogRef.close(this.profile);
    }
  }

  addRoom() {
    this.rooms = this.setupForm.get('rooms') as FormArray;
    this.rooms.push(this.createRoom());
  }

  getRoomsControls(): FormGroup[] {
    this.rooms = this.setupForm.get('rooms') as FormArray;
    return this.rooms.controls as FormGroup[];
  }

  createRoom(): FormGroup {
    return new FormGroup({
      type: new FormControl(''),
      minutes: new FormControl('')
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
