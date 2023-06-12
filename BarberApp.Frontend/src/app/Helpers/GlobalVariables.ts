import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { BarberModel } from '../Models/BarberModel';
import { UserConfig } from '../Models/UserConfig';
import { WorkingDays } from '../Models/WorkingDays';
import { UserModel } from '../Models/UserModel';
import { ClassesModel } from '../Models/ClassesModel';
import { AppColors } from '../Models/Enums/app-colors.enum';
import { AppKeys, LoadAppService } from '../Services/api/LoadApp.service';
import { ClientModel } from '../Models/ClientModel';
import { Moment } from 'moment';
export class GlobalVariables {

  private static loadAppService?: LoadAppService;

  // PROPERTIES
  static startTime = 9;
  static endTime = 17;
  static intervalTimeMinutes = 30;
  static userWorkingDays: WorkingDays[];

  static get isAdmin() {
    const userModel = this.getUserModel();
    if (!userModel)
      return false;
    let userBarberId: string | null | undefined = userModel.barberId;

    return !userBarberId;
  }

  static get userLevel() {
    return this.getUserModel().userLevel ?? 4;
  }

  static selectedBarber?: BarberModel;
  static datesSeen: string[] = [];

  static emptySchedules: ScheduleModel[] = [];
  static allClasses: ClassesModel[] = [];
  static selectedClass?: ClassesModel;

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

  public static companyUserConfig?: UserConfig;

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

  private static _clients: ClientModel[] = [];
  static get clients() {
    return this._clients;
  }
  static set clients(value) {
    this._clients = value;
  }



  /////////////////////////////////////////////////////
  ////////////////    USER METHODS     ////////////////
  /////////////////////////////////////////////////////

  static currentDay = moment();

  static async getEmptySchedulesBase() {
    const currentDay = moment(GlobalVariables.currentDay);
    const currentDaySchedules = GlobalVariables.schedules.filter(p => p.date === currentDay.format('L'))
    const dateFormat = 'YYYY-MM-DD';
    const dateTimeFormat = `${dateFormat} HH:mm`;
    if (!this.datesSeen.includes(currentDay.format(dateFormat))) {
      this.datesSeen.push(currentDay.format(dateFormat))

      const startDate = currentDay.clone().startOf('day').format(dateTimeFormat);
      const endDate = currentDay.clone().endOf('day').format(dateTimeFormat);
      const apicall = GlobalVariables.loadAppService?.loadSchedulesByDate(startDate, endDate);

      apicall?.subscribe({
        next(value) {
          const responseSchedules: ScheduleModel[] = value.data.map((p: any) => {
            return new ScheduleModel(p)
          });
          responseSchedules.forEach(p => {
            GlobalVariables.schedules.push(p);
          })
        },
      })
    }
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
    const delay = 200;
    const noAnimClass = 'no_anim';
    const appColors = Object.values(AppColors);

    function loadCompanyConfig() {
      const companyUserConfig = GlobalVariables.companyUserConfig;
      if (!companyUserConfig)
        return;
      userConfig.altColor = companyUserConfig.altColor;
      userConfig.checks = companyUserConfig.checks;
      userConfig.pageTitles = companyUserConfig.pageTitles;
      userConfig.primaryColor = companyUserConfig.primaryColor;
      userConfig.secondaryColor = companyUserConfig.secondaryColor;
    }

    if (!GlobalVariables.isAdmin)
      loadCompanyConfig();

    htmlElement.classList.add(noAnimClass);

    if (userConfig.darkmode) {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }

    appColors.forEach((value, index) => {
      if (value != userConfig.primaryColor)
        htmlElement.classList.remove(`primary-${value}`);
    })

    htmlElement.classList.add(`primary-${userConfig.primaryColor}`);

    htmlElement.style.setProperty('font-size', userConfig.fontSize);

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



  /////////////////////////////////////////////////
  ////////////////    LOAD APP     ////////////////
  /////////////////////////////////////////////////

  static init(
    _loadAppService: LoadAppService
  ) {
    GlobalVariables.loadAppService = _loadAppService;
    GlobalVariables.loadAppService.init().subscribe({
      next(value) {
        GlobalVariables.clients = value.clients.data.filter((p: ClientModel) => p.name !== null);
        GlobalVariables.employees = value.employees.data.map((p: any) => {
          return new BarberModel(p);
        });
        GlobalVariables.serviceTypes = value.serviceTypes.data;
        GlobalVariables.schedules = value.schedules.data.map((p: any) => {
          return new ScheduleModel(p);
        });
        GlobalVariables.allClasses = value.classes.data;

        GlobalVariables.companyUserConfig = new UserConfig(value.companyUser);

        GlobalVariables.fillProperties();
        GlobalVariables.isAppLoaded = true;

        if (GlobalVariables.employees.length == 0)
          GlobalVariables.loadAppService!.navigateByUrl('/Employees/New');

        if (!GlobalVariables.isAdmin)
          GlobalVariables.selectedBarber = GlobalVariables.employees.find(p => p.barberId === GlobalVariables.getUserModel().barberId)

      },
      error(err) {
        console.log('Erro inesperado');
      },
    });
  }

  private static getUserModel(): UserModel {
    const USER_KEY = 'auth-user';
    let userString = localStorage.getItem(USER_KEY);
    let userModel = new UserModel();

    if (userString)
      userModel = Object.assign(new UserModel(), JSON.parse(userString));

    const isUserEmployee = GlobalVariables.employees.find(p => p.barberId === userModel.barberId);

    if (isUserEmployee)
      Object.assign(userModel, isUserEmployee);

    return userModel;
  }



  static clearProperties() {
    GlobalVariables.isAppLoaded = false;
    GlobalVariables.loadUserConfig(new UserConfig());
    GlobalVariables._schedules = [];
    GlobalVariables._serviceTypes = [];
    GlobalVariables._employees = [];
    GlobalVariables.allClasses = [];
    GlobalVariables.clients = [];
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
}
