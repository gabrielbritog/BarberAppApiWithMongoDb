import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

@Component({
  selector: 'app-ClientsPage',
  templateUrl: './ClientsPage.component.html',
  styleUrls: ['../../Styles/basePage.scss', './ClientsPage.component.scss']
})
export class ClientsPageComponent implements OnInit {
  @ViewChild(WindowScrollDetectorDirective) scrollDetector?: WindowScrollDetectorDirective;
  get scrolledUp() {
    if (this.scrollDetector)
      return this.scrollDetector.scrolledUp;

    return false;
  }

  get headerUrl() {
    let header = 'Alunos'
    const route = this.router.url.split('/').filter(p=>p!='');
    const lastRoute = route[1];
    switch (lastRoute) {
      case 'New':
        header = 'Novo Aluno'
        break;
      case 'Edit':
        header = 'Editar Aluno'
        break;

      default:
        break;
    }

    return header;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');
  }

  onCancel() {
    if (this.router.url == '/Clients')
      this.router.navigateByUrl('/Home');
    else
      this.router.navigateByUrl('/Clients');
  }


}
