import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { AppColors } from 'src/app/Models/Enums/app-colors.enum';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';

@Component({
  selector: 'app-ListEmployee',
  templateUrl: './ListEmployee.component.html',
  styleUrls: ['../../../Styles/baseSection.scss','./ListEmployee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  searchValue = "";

  get barberList(){
    return GlobalVariables.employees
    .filter(p =>
      (p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase()).includes(this.searchValue.toLowerCase()) ||
      p.phoneNumber?.toLowerCase().includes(this.searchValue.toLowerCase())
    )
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  get employeesTable() {
    const _tables: DefaultTable = {
      titles: ['Nome'],
      objects: [],
      buttons: [
        {
          label: 'Detalhes',
          fontawesomeIcon: 'fa-solid fa-arrow-up-right-from-square',
          bgColor: 'main',
          onClick: (event: any) => this.editEmployee(event)
        },
      ],
      onClick: (event: any) => this.editEmployee(event)
    }

    const loggedBarber = this.tokenStorage.getUserModel().barberId;

    GlobalVariables.employees.forEach((employee, i) => {
      if(!loggedBarber || loggedBarber !== employee.barberId)
        _tables.objects.push({
          object: {
            name: `${employee.firstName} ${employee.lastName}`,
            id: employee.barberId
          },
          fontawesomeIcon: "fa-solid fa-user",
          imgUrl: employee.urlImage,
          iconBgColor: 'main'
        })
    })

    return _tables;
  }

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
   ) { }

  ngOnInit() {
  }

  newBarber() {
    this.router.navigateByUrl('/Employees/New');
  }

  editEmployee(event: any) {
    if (!event.object?.id)
      return;

    this.router.navigateByUrl(`/Employees/Edit/${event.object.id}`);
  }

}
