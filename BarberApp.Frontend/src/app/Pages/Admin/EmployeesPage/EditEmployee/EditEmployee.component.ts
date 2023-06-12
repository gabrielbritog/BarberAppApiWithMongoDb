import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormInput, IFormOptions } from 'src/app/Components/FormInput/IFormInput';
import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { BarberModel } from 'src/app/Models/BarberModel';
import { EmployeeService } from 'src/app/Services/api/Employee.service';
import { RouteHistoryService } from '../../../../Services/misc/route-history.service';
import { UserLevel, environment } from 'src/app/Helpers/environment';

@Component({
  selector: 'app-EditEmployee',
  templateUrl: './EditEmployee.component.html',
  styleUrls: ['../../../Styles/baseSection.scss', './EditEmployee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id: string = '';
  subscription?: Subscription;

  barberModel = new BarberModel();

  modalInputs: IFormInput[] = [
    {
      id: 'firstName',
      label: 'Nome',
      type: 'text',
      value: ''
    },
    {
      id: 'lastName',
      label: 'Sobrenome',
      type: 'text',
      value: ''
    },
    {
      id: 'phoneNumber',
      label: 'Celular',
      type: 'text',
      value: ''
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    }
  ]
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeHistoryService: RouteHistoryService,
  ) { }

  ngOnInit() {
    if (!this.activatedRoute.snapshot.params['id']){
      this.router.navigateByUrl('/Employees');
      return;
    }

    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (!params['id']){
            this.router.navigateByUrl('/Employees');
            return;
          }

          this.id = params['id'];

          const existedEmployeeModel = GlobalVariables.employees.find(emp => emp.barberId === this.id);

          if (!existedEmployeeModel) {
            this.router.navigateByUrl('/Clients');
            return;
          }

          this.barberModel = {...existedEmployeeModel};
          this.updateModalInputs();
        }
      )
  }

  updateModalInputs() {
    this.modalInputs = [
      {
        id: 'userLevel',
        label: 'Permissões do funcionário',
        type: 'select',
        value: this.barberModel.userLevel,
        formOptions: this.UserLevelAsFormOptions
      },
      {
        id: 'firstName',
        label: 'Nome',
        type: 'text',
        value: this.barberModel.firstName
      },
      {
        id: 'lastName',
        label: 'Sobrenome',
        type: 'text',
        value: this.barberModel.lastName
      },
      {
        id: 'phoneNumber',
        label: 'Celular',
        type: 'text',
        value: this.barberModel.phoneNumber
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        value: this.barberModel.email
      }
    ]
  }

  get UserLevelAsFormOptions(): IFormOptions[] {
    const userLevelKeys = Object.keys(environment.userLevel) as Array<keyof typeof environment.userLevel>;
    const loggedUserLevel = GlobalVariables.userLevel;

    return userLevelKeys.filter(p=> p!== 'admin').map((p, index) => {
      const keyValue = environment.userLevel[p];
      return {
        id: 'level_' + keyValue,
        label: UserLevel[keyValue],
        value: keyValue
      }
    }).filter(p=> p.value != loggedUserLevel);
  }

  onSubmit(form: NgForm) {
    if (form.invalid)
      return;


    if (form.value.email === this.barberModel.email) {
      form.value.email = null;
    }

    form.value.userLevel = parseInt(form.value.userLevel)

    const APICALL = this.employeeService.updateEmployee(form.value, this.barberModel.email, this.barberModel.barberId ?? '');

    APICALL.subscribe({
      next: (response: any) => {
        this.barberModel = response.data;
        const existedEmployee = GlobalVariables.employees.find(p => p.barberId === this.barberModel.barberId);
        if (existedEmployee)
          Object.assign(existedEmployee, this.barberModel);

        this.routeHistoryService.navigateBack();
      },
      error(err) {
        console.log(err)
      },
    })
  }

}
