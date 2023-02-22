import { Component, Input, OnInit } from '@angular/core';
import { BarberModel } from '../../../Models/BarberModel';

@Component({
  selector: 'app-BarberCard',
  templateUrl: './BarberCard.component.html',
  styleUrls: ['../baseCard.scss', './BarberCard.component.scss']
})
export class BarberCardComponent implements OnInit {

  @Input('model') barberModel = new BarberModel();

  constructor() { }

  ngOnInit() {
  }

}
