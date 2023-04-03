import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { DashboardSectionComponent } from '../DashboardPage/DashboardSection.component';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild(WindowScrollDetectorDirective) scrollDetector?: WindowScrollDetectorDirective;
  get scrolledUp() {
    if (this.scrollDetector)
      return this.scrollDetector.scrolledUp;

    return false;
  }

  get currentSection(){ return GlobalVariables.currentSection };

  loadedSchedules = false;
  loadedServiceTypes = false;
  loadedBarbers = false;
  appLoaded = false;

  constructor(
      private tokenStorage: TokenStorageService,
      private router: Router
    ) {  }

  ngOnInit() {

    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/Login');
      return;
    }

    if (GlobalVariables.isAppLoaded) {
      this.appLoaded = true;
    } else {
      this.loadApp();
    }
  }

  loadApp() {
    DashboardSectionComponent.clearProperties();
    GlobalVariables.showSidebar = false;
    GlobalVariables.init().subscribe({
      next: (data: any) => {
        this.loadedSchedules =
          this.loadedServiceTypes =
          this.loadedBarbers = true;

        this.loadedFunction();
      },
      error: (err) => {
        console.log('Algo deu errado');
        this.tokenStorage.signOut();
      }
    })
  }

  isAppLoaded() {
    let loadCondition = this.loadedBarbers && this.loadedServiceTypes && this.loadedSchedules;
    return loadCondition;
  }

  loadedFunction() {
    if (!this.isAppLoaded() || this.appLoaded)
      return;

    GlobalVariables.currentSection = 1;

    GlobalVariables.fillProperties();

    this.appLoaded = GlobalVariables.isAppLoaded = true;

    if (GlobalVariables.employees.length == 0)
      this.router.navigateByUrl('/Employees/New');
  }

}
