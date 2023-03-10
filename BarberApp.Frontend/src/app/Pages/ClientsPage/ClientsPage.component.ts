import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { UserModel } from 'src/app/Models/UserModel';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-ClientsPage',
  templateUrl: './ClientsPage.component.html',
  styleUrls: ['../../Shared/Styles/basePage.scss', './ClientsPage.component.scss']
})
export class ClientsPageComponent implements OnInit {

  get headerUrl() {
    let header = 'Clientes'
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

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken())
      this.router.navigateByUrl('/Login');

    if (!GlobalVariables.loadFromLocalStorage())
      this.router.navigateByUrl('/Home');

  }

  onCancel() {
    if (this.router.url == '/Clients')
      this.router.navigateByUrl('/Home');
    else
      this.router.navigateByUrl('/Clients');
  }


}
