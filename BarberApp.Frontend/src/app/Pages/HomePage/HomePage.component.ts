import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../Helpers/GlobalVariables';

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
  get roundedCurrentSection() { return Math.round(this.currentSection) };

  tabsWidth: number[] = [];
  tabsLeft: number[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    this.scrollEventListener();
    this.getTabsWidth();
    this.getTabsLeft();
  }

  getTabsLeft() {
    this.tabsLeft = [];
    let result = 0;

    this.tabsWidth.forEach((elementWidth, index) => {
      if (index > 0)
        result += this.tabsWidth[index - 1];

      this.tabsLeft.push(result);
    })
  }

  getTabsWidth() {
    const sectionTabs = document.getElementById(this.sectionTabsId)!;
    const childCount = sectionTabs.childElementCount;
    this.tabsWidth = [];

    for (let index = 0; index < childCount; index++) {
      const child = sectionTabs.childNodes[index] as HTMLElement;
      this.tabsWidth.push(child.clientWidth);
    }
  }

  setToSection(index: number) {
    const sectionContainer = document.getElementById(this.sectionContainerId)!;
    sectionContainer.scrollLeft = window.innerWidth * index;
  }

  scrollEventListener() {
    let sectionContainer = document.getElementById(this.sectionContainerId)!;
    let tabssectionTabs = document.getElementById(this.sectionTabsId)!;
    let tabsCount = tabssectionTabs.childElementCount;
    let scrolledAtMax = false;
    let scrolledAtBegin = true;
    let screenWidth = window.innerWidth;
    let tabScrollWidth = tabssectionTabs.scrollWidth;
    let tabClientWidth = tabssectionTabs.clientWidth;
    let maxScrollLeft = tabScrollWidth - tabClientWidth;

    sectionContainer.addEventListener('scroll', (event) => {
      this.sectionScroll = sectionContainer.scrollLeft;
      GlobalVariables.currentSection = this.sectionScroll / screenWidth;

      if (Math.round( GlobalVariables.currentSection) >= ((tabsCount - 1) / 2) && !scrolledAtMax){
        tabssectionTabs.scrollLeft = maxScrollLeft;
        scrolledAtMax = true;
        scrolledAtBegin = false;
      }
      else if (Math.round( GlobalVariables.currentSection) < ((tabsCount - 1) / 2) &&!scrolledAtBegin){
        tabssectionTabs.scrollLeft = 0;
        scrolledAtMax = false;
        scrolledAtBegin = true;
      }
    })

    window.addEventListener('resize', (e) => {
      screenWidth = window.innerWidth;
      tabScrollWidth = tabssectionTabs.scrollWidth;
      tabClientWidth = tabssectionTabs.clientWidth;
      maxScrollLeft = tabScrollWidth - tabClientWidth;
      this.getTabsWidth();
      this.getTabsLeft();
    })
  }

  indicatorWidth() {
    return `${this.tabsWidth[this.roundedCurrentSection]}px`;
  }

  indicatorLeft() {
    return `calc(5vw + ${this.tabsLeft[this.roundedCurrentSection]}px)`;
  }

}
