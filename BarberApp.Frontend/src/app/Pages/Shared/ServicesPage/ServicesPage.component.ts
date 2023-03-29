import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

@Component({
  selector: 'app-ServicesPage',
  templateUrl: './ServicesPage.component.html',
  styleUrls: ['../../Styles/basePage.scss', './ServicesPage.component.scss']
})
export class ServicesPageComponent implements OnInit {
  @ViewChild(WindowScrollDetectorDirective) scrollDetector?: WindowScrollDetectorDirective;
  get scrolledUp() {
    if (this.scrollDetector)
      return this.scrollDetector.scrolledUp;

    return false;
  }

  get headerUrl() {
    let header = 'Serviços'
    const route = this.router.url.split('/');
    const lastRoute = route[route.length -1];
    switch (lastRoute) {
      case 'New':
        header += ' / Novo'
        break;
      case 'Edit':
        header += ' / Editar'
        break;

      default:
        break;
    }

    return header;
  }

  get showAdminBoard() {
    return GlobalVariables.isAdmin && this.router.url == '/Services';
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');


      if (!GlobalVariables.isAppLoaded)
      GlobalVariables.initStandalone();

  }

  onCancel() {
    if (this.router.url == '/Services')
      this.router.navigateByUrl('/Home');
    else
      this.router.navigateByUrl('/Services');
  }


}
