import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from '../../Helpers/GlobalVariables';

@Component({
  selector: 'app-PlusButton',
  templateUrl: './PlusButton.component.html',
  styleUrls: ['./PlusButton.component.scss']
})
export class PlusButtonComponent implements OnInit {

  @Input('onClickEvent') onClickEvent = (): void => { };

  constructor() { }

  ngOnInit() {
  }

  disableEditModal() {
    GlobalVariables.editSchedule = undefined;
    GlobalVariables.editServiceType = undefined;
    GlobalVariables.modalAsEdit = false;
  }

}
