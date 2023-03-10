import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { BarberModel } from '../Models/BarberModel';
import { UserConfig } from '../Models/UserConfig';
import { WorkingDays } from '../Models/WorkingDays';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../Services/Employee.service';
import { SchedulingService } from '../Services/SchedulingService.service';
import { ServiceTypeService } from '../Services/ServiceType.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { TokenStorageService } from '../Services/token-storage.service';
import { UserModel } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariables {

  private static schedulingService?: SchedulingService;
  private static serviceTypeService?: ServiceTypeService;
  private static employeeService?: EmployeeService;
  // IP DA MÁQUINA
  // static readonly MACHINE_IP = "localhost";
  static readonly MACHINE_IP = 'http://192.168.1.83:5066';

  static startTime = 9;
  static endTime = 17;
  static intervalTimeMinutes = 30;
  static userWorkingDays: WorkingDays[];

  static get isAdmin() {
    const userModel = this.getUserModel();
    let userBarberId: string | null = userModel.barberId;

    return !userBarberId;
  }

  static selectedBarber?: BarberModel;

  static emptySchedules: ScheduleModel[] = [];

  static appLoaded = false;

  // MODALS
  static showScheduleModal = false;
  static showServiceTypeModal = false;
  static showBarberModal = false;
  static modalAsEdit = false;
  static sidebarExpanded = false;

  // EDIT MODALS VARIABLES
  static editSchedule: ScheduleModel | undefined;
  static editServiceType: ServiceTypeModel | undefined;
  static editBarber: BarberModel | undefined;

  // HOME SECTIONS
  static currentSection = 0;

  // SCHEDULES / SERVICE TYPES / EMPLOYEES
  private static _schedules: ScheduleModel[] = [];
  static get schedules() {
    return this._schedules;
  }
  static set schedules(value) {
    this._schedules = value;
    this.saveAppData('schedules');
  }

  private static _serviceTypes: ServiceTypeModel[] = [];
  static get serviceTypes() {
    return this._serviceTypes;
  }
  static set serviceTypes(value) {
    this._serviceTypes = value;
    this.saveAppData('serviceTypes');
  }

  private static _employees: BarberModel[] = [];
  static get employees() {
    return this._employees;
  }
  static set employees(value) {
    this._employees = value;
    this.saveAppData('employees');
  }


  static currentDay = moment();

  // LOADER
  static loader = false;
  static isLoaderSuccess = false;
  static showLoaderSuccess = true;

  static FillProperties(user?: UserModel) {
    user = user ?? this.getUserModel();
    if (user) {
      GlobalVariables.loadUserConfig(user.userConfig);
      GlobalVariables.userWorkingDays = user.workingDays!;

      if (GlobalVariables.isAdmin && GlobalVariables._employees.length > 0)
        GlobalVariables.selectedBarber = GlobalVariables._employees[0];
      else
        GlobalVariables.selectedBarber = undefined;
    }
    GlobalVariables.currentSection = 1;

    GlobalVariables.getEmptySchedulesBase();
  }

  static getEmptySchedulesBase() {
    const currentDay = moment(GlobalVariables.currentDay);
    const currentDaySchedules = GlobalVariables.schedules.filter(p=>p.date === currentDay.format('L'))
    const workingDay = GlobalVariables.userWorkingDays[currentDay.weekday()];

    const startTime = workingDay.openingTime;
    const startTimeAsHours = moment.duration(startTime).asHours();
    const endTime = workingDay.closingTime;
    const endTimeAsHours = moment.duration(endTime).asHours();
    const intervalTime = moment.duration(workingDay.intervalTime).asMinutes();
    const totalWorkInMinutes = (endTimeAsHours - startTimeAsHours) * 60;
    const totalDayInMinutes = (24 * 60) -1;
    const schedules: ScheduleModel[] = [];

    if(workingDay.isOpen){
      for (let index = 0; index <= totalDayInMinutes; index++) {
        if ((index % intervalTime == 0 && index >= startTimeAsHours*60 && index <= endTimeAsHours*60)||
          currentDaySchedules.some(p => p.time == currentDay.hour(0).minute(index).format('HH:mm'))) {
            schedules.push(
              new ScheduleModel({
                date: currentDay.format('yyyy-MM-DD'),
                time: currentDay.hour(0).minute(index).format('HH:mm'),
              })
            );
          }
      }
    }

    GlobalVariables.emptySchedules = schedules;

    return schedules;
  }

  static loadUserConfig(userConfig: UserConfig) {
    const bodyElement = document.body;
    const delay = 200;
    const noAnimClass = 'no_anim';

    bodyElement.classList.add(noAnimClass);

    if (!userConfig.darkmode) {
      if (!bodyElement.classList.contains('light-mode'))
        bodyElement.classList.add('light-mode');
    } else if (bodyElement.classList.contains('light-mode')) {
      bodyElement.classList.remove('light-mode');
    }

    bodyElement.style.setProperty('font-size', userConfig.fontSize);
    bodyElement.style.setProperty('--app-color-primary', userConfig.primaryColor);
    bodyElement.style.setProperty(
      '--app-color-secondary',
      userConfig.secondaryColor
    );

    setTimeout(() => bodyElement.classList.remove(noAnimClass), delay);
  }

  static createWorkingDays() {
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const workingDays: WorkingDays[] = [];
    const openingTime = '09:00';
    const closingTime = '17:00';
    const intervalTime = '00:30';
    for (let index = 0; index < weekDays.length; index++) {
      const element = new WorkingDays({
        index: index,
        day: weekDays[index],
        openingTime: openingTime,
        closingTime: closingTime,
        intervalTime: intervalTime
      });
      workingDays.push(element);
    }
    return workingDays;
  }

  static init(
    schedulingService: SchedulingService,
    serviceTypeService: ServiceTypeService,
    employeeService: EmployeeService
  ) {
    GlobalVariables.initServices(schedulingService, serviceTypeService, employeeService);

    return GlobalVariables.loadAppData();
  }

  static initServices(
    schedulingService: SchedulingService,
    serviceTypeService: ServiceTypeService,
    employeeService: EmployeeService
  ) {
    GlobalVariables.serviceTypeService = serviceTypeService;
    GlobalVariables.schedulingService = schedulingService;
    GlobalVariables.employeeService = employeeService;
  }

  static loadFromLocalStorage(): boolean {
    const schedules = localStorage.getItem('schedules');
    const employees = localStorage.getItem('employees');
    const serviceTypes = localStorage.getItem('serviceTypes');
    const userLoggedIn = localStorage.getItem('auth-user');
    const userModel = Object.assign(new UserModel(), JSON.parse(userLoggedIn!));

    if (!userLoggedIn || userLoggedIn === 'undefined')
      return false;

    if (!schedules || !employees || !serviceTypes)
      return false;

    if (schedules === 'undefined' || employees === 'undefined' || serviceTypes === 'undefined')
      return false;

    GlobalVariables._schedules = JSON.parse(schedules).map((obj: any) => Object.assign(new ScheduleModel(), obj));
    GlobalVariables._employees = JSON.parse(employees).map((obj: any) => Object.assign(new BarberModel(), obj));
    GlobalVariables._serviceTypes = JSON.parse(serviceTypes).map((obj: any) => Object.assign(new ServiceTypeModel(), obj));
    GlobalVariables.currentDay = moment();

    GlobalVariables.FillProperties(userModel);
    return true;
  }

  private static getSchedules(): Observable<boolean> {
    return GlobalVariables.schedulingService!.getAllSchedule().pipe(
      map((data: any) => {
        let schedules: ScheduleModel[] = data.data.map((element: any) => new ScheduleModel(element));
        GlobalVariables.schedules = schedules;
        return true;
      }),
      catchError((err) => {
        console.log(err.data.message);
        return of(false);
      })
    );
  }

  private static getServiceTypes(): Observable<boolean> {
    return GlobalVariables.serviceTypeService!.getAllServiceType().pipe(
      map((data: any) => {
        let serviceTypes: ServiceTypeModel[] = data.data.map((element: any) => new ServiceTypeModel(element));
        GlobalVariables.serviceTypes = serviceTypes;
        return true;
      }),
      catchError(err => {
        console.log(err.data.message);
        return of(false);
      })
    );
  }

  private static getEmployees(): Observable<boolean> {
    return GlobalVariables.employeeService!.getAllEmployees().pipe(
      map((data: any) => {
        let employees: BarberModel[] = data.data.map((element: any) => new BarberModel(element));
        GlobalVariables.employees = employees;
        return true;
      }),
      catchError(err => {
        console.log(err.data.message);
        return of(false);
      })
    );
  }

  private static loadAppData() {
    const isSchedulesLoaded = this.getSchedules();
    const isServiceTypesLoaded = this.getServiceTypes();
    const isBarbersLoaded = this.getEmployees();

    return forkJoin([isSchedulesLoaded, isServiceTypesLoaded, isBarbersLoaded]);
  }

  public static saveAppData(item: 'schedules' | 'employees'| 'serviceTypes'| 'all') {

    console.log('fui chamado por: ', item);
    // console.log(_schedu)

    if (item === 'schedules' || item === 'all')
      localStorage.setItem('schedules', JSON.stringify(this._schedules));

    if (item === 'employees' || item === 'all')
      localStorage.setItem('employees', JSON.stringify(this._employees));

    if (item === 'serviceTypes' || item === 'all')
      localStorage.setItem('serviceTypes', JSON.stringify(this._serviceTypes));
  }

  private static getUser() {
    const USER_KEY = 'auth-user';
    return localStorage.getItem(USER_KEY);
  }

  private static getUserModel() {
    let userString = this.getUser();

    if (userString)
      return Object.assign(new UserModel(), JSON.parse(userString));

    return null;
  }
}
