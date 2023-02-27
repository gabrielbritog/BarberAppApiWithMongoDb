import { Component, OnInit } from '@angular/core';
import { BarberModel } from 'src/app/Models/BarberModel';
import { GlobalVariables } from '../../../../Helpers/GlobalVariables';

@Component({
  selector: 'app-BarbersSection',
  templateUrl: './BarbersSection.component.html',
  styleUrls: ['../baseSection.scss', './BarbersSection.component.scss']
})
export class BarbersSectionComponent implements OnInit {

  searchValue = "";

  get showModal() {
    return GlobalVariables.showBarberModal;
  };

  get barberList(){
    return GlobalVariables.barbers
    .filter(p =>
      (p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
      p.phoneNumber?.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  constructor() { }

  ngOnInit() {
  }

  newBarber() {
    GlobalVariables.showBarberModal = true;
  }

}
