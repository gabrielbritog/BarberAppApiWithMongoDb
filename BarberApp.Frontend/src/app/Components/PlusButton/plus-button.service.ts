import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlusButtonService {
  private static _showButton = false;
  get showButton() {
    return PlusButtonService._showButton;
  }

  constructor() { }

  show() {
    PlusButtonService._showButton = true;
  }

  hide() {
    PlusButtonService._showButton = false;
  }


}
