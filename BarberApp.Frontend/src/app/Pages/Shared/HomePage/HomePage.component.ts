import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { DashboardSectionComponent } from '../DashboardPage/DashboardSection.component';
import { LoadAppService } from '../../../Services/api/LoadApp.service';

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

  get currentSection() { return GlobalVariables.currentSection };
  
  get appLoaded() {
    return GlobalVariables.isAppLoaded;
  }

  constructor(
      private tokenStorage: TokenStorageService,
      private router: Router,
      private loadAppService: LoadAppService
  ) { }
  
  ngOnInit() {

    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/Login');
      return;
    }

    if (!GlobalVariables.isAppLoaded) {
      this.loadApp();
    }
  }


  loadApp() {
    DashboardSectionComponent.clearProperties();
    GlobalVariables.showSidebar = false;
    GlobalVariables.init(this.loadAppService);
  }

}
