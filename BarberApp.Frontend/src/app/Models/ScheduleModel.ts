import * as moment from 'moment';
import { ServiceTypeModel } from './ServiceTypeModel';
export class ScheduleModel {
  clientName: string = "";
  serviceType: ServiceTypeModel[] = [];
  schedulingDate: string = "";
  date: string = "";
  time: string = "";

  constructor(params?: Partial<ScheduleModel>) {
    if (!params)
      return;

    Object.assign(this, params);


    if (this.schedulingDate == ""){
      let momentDateString = "";
      if (this.date != "")
        momentDateString += `${this.date}T`;

      if (this.time != "")
        momentDateString += `${this.time}Z`;

      let momentFormat = 'YYYY-MM-DDTHH:mm:ssZ';
      let momentDate = moment(momentDateString, momentFormat);

      let dotNetDate = momentDate.toISOString();

      this.schedulingDate = dotNetDate;
    } else {
      let dotNetDate = moment(this.schedulingDate);
      this.date = dotNetDate.format('L');
      this.time = dotNetDate.format('HH:mm');
    }
  }
}
