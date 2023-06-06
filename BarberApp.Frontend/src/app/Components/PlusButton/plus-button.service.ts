import { Injectable } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { environment } from 'src/app/Helpers/environment';

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
    if (GlobalVariables.userLevel > environment.userLevel.manager)
      return;
    PlusButtonService._showButton = true;
  }

  hide() {
    PlusButtonService._showButton = false;
  }


}
