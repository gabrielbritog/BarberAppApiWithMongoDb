import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-PlusButton',
  templateUrl: './PlusButton.component.html',
  styleUrls: ['./PlusButton.component.scss']
})
export class PlusButtonComponent implements OnInit {

  @Input('onClickEvent') onClickEvent = (): void => { };
  @Input() marginBot = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  disableEditModal() {
    GlobalVariables.editSchedule = undefined;
    GlobalVariables.editServiceType = undefined;
    GlobalVariables.modalAsEdit = false;
  }

}
