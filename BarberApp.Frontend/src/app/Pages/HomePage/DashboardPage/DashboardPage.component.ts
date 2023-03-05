import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-DashboardPage',
  templateUrl: './DashboardPage.component.html',
  styleUrls: ['../../../Shared/Styles/basePage.scss','./DashboardPage.component.scss']
})
export class DashboardPageComponent implements OnInit {

  quickDate = 'week';
  top5 = 'func';

  startDate = moment().add(-7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');


  constructor() { }

  ngOnInit() {
  }

  dateChanged() {
    this.quickDate = '';
  }

  setQuickDate(quickDate: string) {
    if (quickDate === 'month'){
      this.quickDate = 'month';
      this.startDate = moment().add(-1, 'month').format('YYYY-MM-DD');
      this.endDate = moment().format('YYYY-MM-DD');
      return;
    }
    if (quickDate === 'year'){
      this.quickDate = 'year';
      this.startDate = moment().add(-1, 'year').format('YYYY-MM-DD');
      this.endDate = moment().format('YYYY-MM-DD');
      return;
    }

    this.quickDate = 'week';
    this.startDate = moment().add(-1, 'week').format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
  }

  setTop5(top5: string) {
    this.top5 = top5;
  }

  onCancel() {

  }

}
