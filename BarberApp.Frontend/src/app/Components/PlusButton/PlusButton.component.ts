import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { PlusButtonService } from './plus-button.service';

@Component({
  selector: 'app-PlusButton',
  templateUrl: './PlusButton.component.html',
  styleUrls: ['./PlusButton.component.scss']
})
export class PlusButtonComponent implements OnInit {
  @Input() marginBot = true;
  show() {
    return this.plusButtonService.showButton;
  }

  constructor(
    private router: Router,
    private plusButtonService: PlusButtonService
  ) { }

  ngOnInit() {
  }

  disableEditModal() {
    GlobalVariables.editSchedule = undefined;
    GlobalVariables.editServiceType = undefined;
    GlobalVariables.modalAsEdit = false;
  }

  onClick() {
    const currentRoute = this.router.url;
    const newRouteString = '/New';
    this.router.navigateByUrl(currentRoute + newRouteString);
  }

}
