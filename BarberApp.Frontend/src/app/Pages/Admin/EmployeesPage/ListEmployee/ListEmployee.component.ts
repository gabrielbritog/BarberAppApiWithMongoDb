import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Router } from '@angular/router';
import { DefaultTable } from 'src/app/Components/Tables/default-table/default-table';
import { AppColors } from 'src/app/Models/Enums/app-colors.enum';

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
      titles: ['Nome', 'Telefone'],
      objects: [],
      // onClick: () => this.metodoTeste()
    }

    GlobalVariables.employees.forEach((employee, i) => {
      _tables.objects.push({
        object: {
          name: `${employee.firstName} ${employee.lastName}`,
          phone: employee.phoneNumber,
        },
        fontawesomeIcon: "fa-solid fa-user",
        imgUrl: employee.urlImage,
        iconBgColor: 'main'
      })
    })

    return _tables;
  }

  constructor(
    private router: Router
   ) { }

  ngOnInit() {
  }

  newBarber() {
    this.router.navigateByUrl('/Employees/New');
  }

}
