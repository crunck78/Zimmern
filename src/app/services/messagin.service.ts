import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessaginService {

  constructor() { }

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
