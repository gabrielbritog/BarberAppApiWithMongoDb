import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
import { ServiceTypeModel } from '../Models/ServiceTypeModel';
export class GlobalVariables {


  public static startTime = 9;
  public static endTime = 17;

  public static emptySchedules: ScheduleModel[] = [];

  // MODALS
  public static showScheduleModal = false;
  public static showServiceTypeModal = false;
  public static modalAsEdit = false;

  // EDIT MODALS VARIABLES
  public static editSchedule: ScheduleModel | undefined;
  public static editServiceType: ServiceTypeModel | undefined;

  // HOME SECTIONS
  public static currentSection = 0;

  // SCHEDULES
  public static schedules: ScheduleModel[] = [];
  public static serviceTypes: ServiceTypeModel[] = [];
  public static currentDay = moment();

  // LOADER
  public static loader = false;
  public static isLoaderSuccess = false;
  public static showLoaderSuccess = true;

  // ACCOUNT PAGE
  public static accountExpanded = false;

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
}
