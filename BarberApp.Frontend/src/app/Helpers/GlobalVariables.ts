import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
import { BarberModel } from '../Models/BarberModel';
import { UserConfig } from '../Models/UserConfig';
import { WorkingDays } from '../Models/WorkingDays';
export class GlobalVariables {
  // IP DA MÁQUINA
  // public static readonly MACHINE_IP = "localhost";
  public static readonly MACHINE_IP = '192.168.1.8';

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

    const startTime = GlobalVariables.userWorkingDays[currentDay.weekday()].openingTime;
    const startTimeAsHours = moment.duration(startTime).asHours();
    const endTime = GlobalVariables.userWorkingDays[currentDay.weekday()].closingTime;
    const endTimeAsHours = moment.duration(endTime).asHours();
    const intervalTime = GlobalVariables.userWorkingDays[currentDay.weekday()].intervalTime;
    const totalWorkInHours = endTimeAsHours - startTimeAsHours;
    const totalWorkInMinutes = totalWorkInHours * 60;
    let schedules: ScheduleModel[] = [];

    console.log(startTime, endTime)
    for (let index = 0; index <= totalWorkInMinutes; index+=intervalTime) {
      schedules.push(
        new ScheduleModel({
          date: currentDay.format('yyyy-MM-DD'),
          time: currentDay.hour(startTimeAsHours).minute(index).format('HH:mm'),
        })
      );
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
    const openingTime = '09:45';
    const closingTime = '17:00';
    const intervalTime = 30;
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
    console.log(moment.duration(openingTime).asMinutes())
    return workingDays;
  }

  static createWorkingDaysUTC() {
    const workingDays = GlobalVariables.createWorkingDays();
    const cleanToday = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    workingDays.forEach(p => {
      p.openingTime = cleanToday.hours(moment.duration(p.openingTime).asHours()).utc(true).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      p.closingTime = cleanToday.hours(moment.duration(p.closingTime).asHours()).utc(true).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    })
    return workingDays;
  }
}
