
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { UserService } from 'src/app/Services/user/User.service';

@Component({
  selector: 'app-HistorySection',
  templateUrl: './HistorySection.component.html',
  styleUrls: ['../../Styles/basePage.scss', './HistorySection.component.scss']
})
export class HistoryPage implements OnInit, AfterViewInit {
  static weeksSeen: number = 0;

  @ViewChildren('historyCard', { read: ElementRef }) historyCards?: QueryList<ElementRef>;
  private observer?: IntersectionObserver;


  searchValue = '';

  get schedules() {
    const today = moment().format('L');
    const todayTime = moment().format('HH:mm');
    const filteredSchedules = GlobalVariables.schedules
      .filter(p=> p.client || p.schedulingClass)
      .filter(p => p.client?.name?.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                  GlobalVariables.allClasses.find(classModel => classModel.id === p.schedulingClass?.classId)?.name?.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                  p.date.includes(this.searchValue) ||
                  p.serviceType.some(p=>p.nameService.includes(this.searchValue)))
      .filter(p => p.date < today || (p.date == today && p.time < todayTime))
      .sort((n1, n2) => n2.schedulingDate.localeCompare(n1.schedulingDate));

    return !GlobalVariables.isAdmin ? filteredSchedules : filteredSchedules.filter(p => p.barberId === GlobalVariables.selectedBarber?.barberId);
  }

  createdCompanyDate: string = '';

  currentWeekLoad = () => {
    return moment().add(-HistoryPage.weeksSeen, 'days').startOf('day')
  };

  diffDays = () => {
    return this.currentWeekLoad().diff(moment(this.createdCompanyDate).startOf('day'), 'day')
  };

  constructor(
    private userService: UserService
  ) { }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    this.observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {
        this.loadMore();
      }

    }, options);
  }

  ngOnInit() {
    if (HistoryPage.weeksSeen === 0)
      this.loadLastMonthSchedules();

    this.loadCompanyRegistrationDate();
    this.intersectionObserver();
  }

  loadCompanyRegistrationDate() {
    this.userService.getCompanyRegistrationDate().subscribe({
      next: (value) => {
        this.createdCompanyDate = moment(value).format('YYYY-MM-DD');
      },
    })
  }

  ngAfterViewInit(): void {
    this.historyCards?.changes.subscribe((d) => {
      if (d.last)
        this.observer?.observe(d.last.nativeElement);
    })
  }

  async loadMore() {
    const limitTimes = HistoryPage.weeksSeen + 4;
    const lastSchedulesCount = GlobalVariables.schedules.length
    const currentSchedules = GlobalVariables.schedules;

    do {
      if (this.diffDays() < 0)
        return;

      HistoryPage.weeksSeen++;
      await GlobalVariables.loadLastWeekSchedules(HistoryPage.weeksSeen, HistoryPage.weeksSeen);

    } while (HistoryPage.weeksSeen < limitTimes && currentSchedules.length == lastSchedulesCount && this.diffDays() > 0);
  }

  async loadLastMonthSchedules() {
    HistoryPage.weeksSeen += 4;
    await GlobalVariables.loadLastWeekSchedules(HistoryPage.weeksSeen, HistoryPage.weeksSeen);
  }

}
