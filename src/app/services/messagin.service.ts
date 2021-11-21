import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessaginService {

  constructor(private _snackBar: MatSnackBar) { }

  show(any: any) {
    this._snackBar.open(any, "Ok");
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return "You must enter a value!";
    }
    if (control.hasError('email')) {
      return "Input is not a Valid Email Address!";
    }
    if (control.hasError('minLength')) {
      return "Input must be at least " + 8 + " Characters long!";
    }
    return "ERROR!!!";
  }
}
