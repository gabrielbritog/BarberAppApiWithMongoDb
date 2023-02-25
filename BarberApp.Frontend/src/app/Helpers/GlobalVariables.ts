import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { BarberModel } from '../Models/BarberModel';
import { UserConfig } from '../Models/UserConfig';
export class GlobalVariables {


  public static startTime = 9;
  public static endTime = 17;

  public static isAdmin = false;
  public static selectedBarber?: BarberModel;

  public static emptySchedules: ScheduleModel[] = [];

  public static appLoaded = false;

  // MODALS
  public static showScheduleModal = false;
  public static showServiceTypeModal = false;
  public static showBarberModal = false;
  public static modalAsEdit = false;

  // EDIT MODALS VARIABLES
  public static editSchedule: ScheduleModel | undefined;
  public static editServiceType: ServiceTypeModel | undefined;
  public static editBarber: BarberModel | undefined;

  // HOME SECTIONS
  public static currentSection = 0;

  // SCHEDULES / SERVICE TYPES / BARBERS
  public static schedules: ScheduleModel[] = [];
  public static serviceTypes: ServiceTypeModel[] = [];
  public static barbers: BarberModel[] = [];
  public static currentDay = moment();

  // LOADER
  public static loader = false;
  public static isLoaderSuccess = false;
  public static showLoaderSuccess = true;

  // IP DA MÁQUINA
  // public static readonly MACHINE_IP = "localhost";
  public static readonly MACHINE_IP = "192.168.1.2";


  public static FillProperties() {
    GlobalVariables.getEmptySchedulesBase();
  }

  static getEmptySchedulesBase() {
    const startTime = GlobalVariables.startTime;
    const endTime = GlobalVariables.endTime;
    const currentDay = moment(GlobalVariables.currentDay);
    let schedules: ScheduleModel[] = [];
    for (let index = startTime; index <= endTime; index++){
      schedules.push(new ScheduleModel({
        date: currentDay.format('yyyy-MM-DD'),
        time: currentDay.hour(index).minute(0).format('HH:mm')
      }));
    }

    GlobalVariables.emptySchedules = schedules;

    return schedules;
  }

  static loadUserConfig(userConfig: UserConfig) {
    const _document = document.documentElement;
    const delay = 200;
    const noAnimClass = 'no_anim';

    _document.classList.add(noAnimClass);

    if (!userConfig.darkmode){
      if (!_document.classList.contains('light-mode'))
        _document.classList.add('light-mode');
    } else if (_document.classList.contains('light-mode')){
      _document.classList.remove('light-mode');
    }

    _document.style.setProperty('font-size', userConfig.fontSize);
    _document.style.setProperty('--app-color-primary', userConfig.primaryColor);
    _document.style.setProperty('--app-color-blue', userConfig.secondaryColor);

    setTimeout(() => _document.classList.remove(noAnimClass), delay);


  }
}
