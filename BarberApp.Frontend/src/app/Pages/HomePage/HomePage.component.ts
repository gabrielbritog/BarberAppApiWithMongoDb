import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../Helpers/GlobalVariables';
import { SchedulingService } from 'src/app/Services/SchedulingService.service';
import { ScheduleModel } from '../../Models/ScheduleModel';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePageComponent implements OnInit {

  sectionContainerId = 'section_container';
  sectionTabsId = 'tab_sections';
  indicatorId = 'indicator_line';


  scrollingLeft = false;
  sectionScroll = 0;

  get currentSection(){ return GlobalVariables.currentSection };
  get roundedCurrentSection() { return Math.round(GlobalVariables.currentSection) };

  tabsWidth: number[] = [];
  tabsLeft: number[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private schedulingService: SchedulingService,
    private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    this.scrollEventListener();
    this.getTabsWidth();
    this.getSchedules();
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
      },
      error: (err) => {
        console.log(err);
        LoaderComponent.SetOptions(false);
      }
    })
  }

  getTabsWidth() {
    const sectionTabs = document.getElementById(this.sectionTabsId)!;
    const tab = sectionTabs.childNodes[0] as HTMLElement;
    let tabsWidth = tab.clientWidth;

    sectionTabs.style.setProperty('--tab-width', `${tabsWidth}px`)
  }

  setToSection(index: number) {
    const sectionContainer = document.getElementById(this.sectionContainerId)!;
    sectionContainer.scrollLeft = window.innerWidth * index;
  }

  scrollEventListener() {
    let sectionContainer = document.getElementById(this.sectionContainerId)!;
    let tabssectionTabs = document.getElementById(this.sectionTabsId)!;
    let screenWidth = window.innerWidth;
    let tabScrollWidth = tabssectionTabs.scrollWidth;
    let tabClientWidth = tabssectionTabs.clientWidth;

    sectionContainer.addEventListener('scroll', (event) => {
      this.sectionScroll = sectionContainer.scrollLeft;
      GlobalVariables.currentSection = this.sectionScroll / screenWidth;
    })

    window.addEventListener('resize', (e) => {
      screenWidth = window.innerWidth;
      tabScrollWidth = tabssectionTabs.scrollWidth;
      tabClientWidth = tabssectionTabs.clientWidth;
      this.getTabsWidth();
    })
  }

}
