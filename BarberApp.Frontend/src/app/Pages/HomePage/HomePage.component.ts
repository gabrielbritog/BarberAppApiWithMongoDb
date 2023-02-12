import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePageComponent implements OnInit {

  sectionContainerId = 'section_container';

  sectionScroll = 0;
  screenWidth = window.innerWidth;
  currentSection = 0;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    this.scrollEventListener();
  }

  setToSection(index: number) {
    const sectionContainer = document.getElementById(this.sectionContainerId);
    if (sectionContainer)
      sectionContainer.scrollLeft = this.screenWidth * index;
  }

  scrollEventListener() {
    const sectionContainer = document.getElementById(this.sectionContainerId);
    let scrolling = false;

    if (sectionContainer)
      sectionContainer?.addEventListener('scroll', (event) => {
        this.sectionScroll = sectionContainer.scrollLeft;
        this.currentSection = this.sectionScroll / this.screenWidth;
      })
  }

}
