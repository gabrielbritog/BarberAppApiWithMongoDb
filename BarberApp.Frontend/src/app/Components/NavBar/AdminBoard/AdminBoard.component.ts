import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';

@Component({
  selector: 'app-AdminBoard',
  templateUrl: './AdminBoard.component.html',
  styleUrls: ['./AdminBoard.component.scss']
})
export class AdminBoardComponent implements OnInit {

  agendaExpanded = false;


  get barberList() {
    return GlobalVariables.barbers.sort((a, b) => {
      const aMatches = a == this.selectedBarber;
      const bMatches = b == this.selectedBarber;
      if (aMatches && !bMatches) {
        return -1;
      } else if (!aMatches && bMatches) {
        return 1;
      } else {
        return a.firstName.localeCompare(b.firstName);
      }
    });
  }

  get selectedBarber() {
    return GlobalVariables.selectedBarber;
  }

  set selectedBarber(value) {
    GlobalVariables.selectedBarber = value;
  }

  constructor() { }

  ngOnInit() {
  }


  setAgenda(barber: any) {
    if (this.barberList.length <= 1)
      return;
    if (this.selectedBarber == barber){
      this.agendaExpanded = !this.agendaExpanded;
      return;
    }

    this.selectedBarber = barber;
    this.agendaExpanded = false;
  }

}
