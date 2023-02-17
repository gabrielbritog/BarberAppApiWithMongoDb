import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
export class GlobalVariables {
  // MODALS
  public static showScheduleModal = false;

  // HOME SECTIONS
  public static currentSection = 0;

  // SCHEDULES
  public static schedules: ScheduleModel[] = [];
  public static currentDay = moment();

  // LOADER
  public static loader = false;
  public static isLoaderSuccess = false;
  public static showLoaderSuccess = true;

  // ACCOUNT PAGE
  public static accountExpanded = false;

  // IP DA MÁQUINA
  public static readonly MACHINE_IP = "192.168.1.83";
}
