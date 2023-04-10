import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-SchedulesSection',
  templateUrl: './SchedulesSection.component.html',
  styleUrls: ['../../Styles/basePage.scss', './SchedulesSection.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SchedulesSectionComponent implements OnInit {

  get isBlocked() {
    if (GlobalVariables.isAdmin && GlobalVariables.employees.length == 0)
      return true;

    return false;
  }

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
  }

  isButtonShown() {
    return this.router.url === '/Schedules'
  }

  newSchedule() {
    GlobalVariables.editSchedule = undefined;
    this.router.navigateByUrl('/Schedules/Details')
  }
}
