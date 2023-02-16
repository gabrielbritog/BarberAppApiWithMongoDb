import * as moment from 'moment';
import { ScheduleModel } from '../Models/ScheduleModel';
export class GlobalVariables {
  public static showScheduleModal = false;
  public static currentSection = 0;
  public static schedules: ScheduleModel[] = [];
  public static currentDay = moment();
  public static loader = false;
  public static isLoaderSuccess = false;
  public static showLoaderSuccess = true;
}
