import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../Models/UserModel';

@Component({
  selector: 'app-ClientCard',
  templateUrl: './ClientCard.component.html',
  styleUrls: ['../baseCard.scss', './ClientCard.component.scss']
})
export class ClientCardComponent implements OnInit {

  @Input('model') userModel = new UserModel();
  @Input('showOptions') showOptions = false;

  constructor() { }

  ngOnInit() {
  }

  editClient() {

  }

}
