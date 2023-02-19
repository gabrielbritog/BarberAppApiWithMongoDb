import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { ScheduleModel } from '../../Models/ScheduleModel';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild('sectionContainer') sectionContainer!: ElementRef;
  @ViewChild('sectionTabs') sectionTabs!: ElementRef;
  private requestId: number = 0;

  screenWidth = window.innerWidth;
  get sectionScroll() { return this.sectionContainer.nativeElement.scrollLeft };

  get currentSection(){ return GlobalVariables.currentSection };
  get roundedCurrentSection() { return Math.round(GlobalVariables.currentSection)};


  loadedSchedules = false;
  tabsWidth: number[] = [];
  tabsLeft: number[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private schedulingService: SchedulingService,
    private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    this.getSchedules();
    this.screenWidth = window.innerWidth;

  }

  ngAfterViewInit() {
    this.scrollEventListener();
    this.getTabsWidth();
  }

  getSchedules() {

    this.schedulingService.getAllSchedule().subscribe({
      next: (data: any) => {
        let schedules: ScheduleModel[] = [];
        data.data.forEach((element: any) => {
          schedules.push(new ScheduleModel(element));
        });
        GlobalVariables.schedules = schedules;
        LoaderComponent.SetOptions(false);
        this.loadedSchedules = true;
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getTabsWidth() {
    let sectionTabs = this.sectionTabs.nativeElement;
    let tab = sectionTabs.childNodes[0] as HTMLElement;
    let tabsWidth = tab.clientWidth;

    sectionTabs.style.setProperty('--tab-width', `${tabsWidth}px`)
  }

  scrollToSection(index: number) {
    this.sectionContainer.nativeElement.scrollLeft = this.screenWidth * index;
  }

  scrollEventListener() {

    fromEvent(this.sectionContainer.nativeElement, 'scroll').subscribe(() => {
      this.requestId = requestAnimationFrame(() => {
        GlobalVariables.currentSection = this.sectionScroll / this.screenWidth;
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    setTimeout(() => {
      this.screenWidth = window.innerWidth;
      this.getTabsWidth();
    }, 300);
  }

}
