import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/UserModel';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from 'src/app/Services/User.service';
import { WorkingDays } from '../../../Models/WorkingDays';
import { GlobalVariables } from '../../../Helpers/GlobalVariables';

@Component({
  selector: 'app-WorkFlowPage',
  templateUrl: './WorkFlowPage.component.html',
  styleUrls: ['../../../Shared/Styles/basePage.scss','./WorkFlowPage.component.scss']
})
export class WorkFlowPageComponent implements OnInit {

  _workingDays: WorkingDays[] = [];
  get workingDays() {
    return this._workingDays;
  }
  set workingDays(value) {
    this._workingDays = value;
  }

  _toggleAll = true;
  get toggleAll() {
    return this._toggleAll;
  }
  set toggleAll(value) {
    this._toggleAll = value;
    this.workingDays.forEach(p => p.isOpen = value);
  }

  get headerUrl() {
    let headerText = 'Horários de Funcionamento ';
    const routerUrl = this.router.url.split('/');
    switch (routerUrl[routerUrl.length-1]) {
      case '/Name':
        headerText += '/ Editar Nome';
        break;
      case '/Email':
        headerText += '/ Editar Email';
        break;
      case '/Phone':
        headerText += '/ Editar Celular';
        break;
      case '/Password':
        headerText += '/ Alterar Senha';
        break;

    }

    return headerText;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) {

    const userWorkingDays = new UserModel(tokenStorage.getUserModel()).workingDays;
    if(!userWorkingDays || userWorkingDays?.length == 0){
      this.workingDays = GlobalVariables.createWorkingDays();
    } else {
      this.workingDays = userWorkingDays;
    }
  }

  ngOnInit() {
  }

  onSubmit() {

  }

  onCancel() {
    if (this.router.url == '/WorkFlow')
      this.router.navigateByUrl('/Home');
    else
      this.router.navigateByUrl('/WorkFlow');
  }
}
