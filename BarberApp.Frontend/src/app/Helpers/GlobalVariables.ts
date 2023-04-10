import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { BarberModel } from '../Models/BarberModel';
import { UserConfig } from '../Models/UserConfig';
import { WorkingDays } from '../Models/WorkingDays';
import { catchError, finalize, forkJoin, map, Observable, of } from 'rxjs';
import { UserModel } from '../Models/UserModel';
import { EmployeeService } from '../Services/api/Employee.service';
import { SchedulingService } from '../Services/api/SchedulingService.service';
import { ServiceTypeService } from '../Services/api/ServiceType.service';
import { ClassesModel } from '../Models/ClassesModel';

export class GlobalVariables {
  // IP DA MÁQUINA
  // static readonly MACHINE_IP = "localhost";
  static readonly MACHINE_IP = 'http://192.168.1.83:5066';

  private static schedulingService?: SchedulingService;
  private static serviceTypeService?: ServiceTypeService;
  private static employeeService?: EmployeeService;

  // PROPERTIES
  static startTime = 9;
  static endTime = 17;
  static intervalTimeMinutes = 30;
  static userWorkingDays: WorkingDays[];

  static get isAdmin() {
    const userModel = this.getUserModel();
    if (!userModel)
      return false;
    let userBarberId: string | null = userModel.barberId;

    return !userBarberId;
  }

  static selectedBarber?: BarberModel;

  static emptySchedules: ScheduleModel[] = [];
  static allClasses: ClassesModel[] = [];
  static selectedClass: ClassesModel;

  // SIDEBAR
  static showSidebar = false;

  // MODALS
  static showScheduleModal = false;
  static showServiceTypeModal = false;
  static showBarberModal = false;
  static modalAsEdit = false;

  // EDIT MODALS VARIABLES
  static editSchedule: ScheduleModel | undefined;
  static editServiceType: ServiceTypeModel | undefined;
  static editBarber: BarberModel | undefined;

  // HOME SECTIONS
  static currentSection = 0;

  // SCHEDULES / SERVICE TYPES / EMPLOYEES
  static isAppLoaded = false;

  private static _schedules: ScheduleModel[] = [];
  static get schedules() {
    return this._schedules;
  }
  static set schedules(value) {
    this._schedules = value;
  }

  private static _serviceTypes: ServiceTypeModel[] = [];
  static get serviceTypes() {
    return this._serviceTypes;
  }
  static set serviceTypes(value) {
    this._serviceTypes = value;
  }

  private static _employees: BarberModel[] = [];
  static get employees() {
    return this._employees;
  }
  static set employees(value) {
    this._employees = value;
  }



  //  MÉTODOS
  static currentDay = moment();

  static clearProperties() {
    GlobalVariables.isAppLoaded = false;
    GlobalVariables.loadUserConfig(new UserConfig());
    GlobalVariables._schedules = [];
    GlobalVariables._serviceTypes = [];
    GlobalVariables._employees = [];
  }

  static fillProperties(user?: UserModel) {
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
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const delay = 200;
    const noAnimClass = 'no_anim';

    htmlElement.classList.add(noAnimClass);

    if (!userConfig.darkmode) {
      if (!bodyElement.classList.contains('light-mode'))
        bodyElement.classList.add('light-mode');
    } else if (bodyElement.classList.contains('light-mode')) {
      bodyElement.classList.remove('light-mode');
    }

    htmlElement.style.setProperty('font-size', userConfig.fontSize);
    bodyElement.style.setProperty('--app-color-primary', userConfig.primaryColor);
    bodyElement.style.setProperty('--app-color-secondary', userConfig.secondaryColor);

    setTimeout(() => htmlElement.classList.remove(noAnimClass), delay*2);
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

  static init() {
    return GlobalVariables.loadAppData();
  }

  static initStandalone() {
    if (GlobalVariables.isAppLoaded)
      return;

    GlobalVariables.loadAppData().subscribe({
      next: (data) => {
        GlobalVariables.fillProperties();
        GlobalVariables.isAppLoaded = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
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
