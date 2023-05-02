import { Component, Input, OnInit } from '@angular/core';
import { ClientModel, ClientModelHelper } from '../../../Models/ClientModel';

@Component({
  selector: 'app-ClientCard',
  templateUrl: './ClientCard.component.html',
  styleUrls: ['../baseCard.scss', './ClientCard.component.scss']
})
export class ClientCardComponent implements OnInit {

  @Input('model') clientModel: ClientModel = ClientModelHelper.create();
  @Input() bigInfo?: string;
  @Input() smallInfo?: string;
  @Input() hideShadow = false;

  constructor() { }

  ngOnInit() {
  }

  editClient() {

  }

}
