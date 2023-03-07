import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { BarberModel } from '../Models/BarberModel';
import { UserConfig } from '../Models/UserConfig';
import { WorkingDays } from '../Models/WorkingDays';
export class GlobalVariables {
  // IP DA MÁQUINA
  // public static readonly MACHINE_IP = "localhost";
  public static readonly MACHINE_IP = 'http://192.168.1.83:5066';

  public static startTime = 9;
  public static endTime = 17;
  public static intervalTimeMinutes = 30;
  public static userWorkingDays: WorkingDays[];

  public static isAdmin = false;
  public static selectedBarber?: BarberModel;

  public static emptySchedules: ScheduleModel[] = [];

  public static appLoaded = false;

  // MODALS
  public static showScheduleModal = false;
  public static showServiceTypeModal = false;
  public static showBarberModal = false;
  public static modalAsEdit = false;
  public static sidebarExpanded = false;

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

  public static FillProperties() {
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
    const _document = document.documentElement;
    const delay = 200;
    const noAnimClass = 'no_anim';

    _document.classList.add(noAnimClass);

    if (!userConfig.darkmode) {
      if (!_document.classList.contains('light-mode'))
        _document.classList.add('light-mode');
    } else if (_document.classList.contains('light-mode')) {
      _document.classList.remove('light-mode');
    }

    _document.style.setProperty('font-size', userConfig.fontSize);
    _document.style.setProperty('--app-color-primary', userConfig.primaryColor);
    _document.style.setProperty(
      '--app-color-secondary',
      userConfig.secondaryColor
    );

    setTimeout(() => _document.classList.remove(noAnimClass), delay);
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
}
