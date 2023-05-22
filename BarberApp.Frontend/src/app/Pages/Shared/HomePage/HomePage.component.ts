import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WindowScrollDetectorDirective } from 'src/app/Directives/WindowScrollDetector/WindowScrollDetector.directive';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { DashboardSectionComponent } from '../DashboardPage/DashboardSection.component';
import { DefaultTable } from '../../../Components/Tables/default-table/default-table';
import { AppColors } from 'src/app/Models/Enums/app-colors.enum';
import * as moment from 'moment';

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
    private router: Router
  ) { }

  ngOnInit() {

    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/Login');
      return;
    }
  }

  tables() {
    const _tables: DefaultTable = {
      titles: ['Nome', 'Telefone'],
      objects: [],
      onClick: () => this.metodoTeste()
    }

    GlobalVariables.employees.forEach((employee, i) => {
      _tables.objects.push({
        object: {
          name: `${employee.firstName} ${employee.lastName}`,
          phone: employee.phoneNumber,
        },
        fontawesomeIcon: "fa-solid fa-user",
        imgUrl: employee.urlImage,
        iconBgColor: AppColors.main
      })
    })


    return _tables;
  }

  metodoTeste(): boolean {
    console.log('Esse foi o método teste');
    return true;
  }



}