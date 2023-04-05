import * as moment from 'moment';
import { ClientModel } from './ClientModel';
import { Recurrence } from './Recurrence';
import { ServiceTypeModel } from './ServiceTypeModel';
export class ScheduleModel {
  schedulingId: string = "";
  barberId!: string;
  client = new ClientModel();
  serviceType: ServiceTypeModel[] = [];
  total?: number;
  schedulingDate: string = "";
  endOfSchedule: string = "";
  recurrence: Recurrence = {
    isRecurrence: false,
    recurrencePeriods: 0
  };


  date: string = "";
  time: string = "";
  endTime: string = "";

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

      if (momentDateString == "")
        return;

      let momentFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
      let momentDate = moment(momentDateString, momentFormat);

      let dotNetDate = momentDate.toISOString();

      this.schedulingDate = dotNetDate;

      let dotNetDateRedo = moment.utc(this.schedulingDate);
      this.date = dotNetDateRedo.format('L');
      this.time = dotNetDateRedo.format('HH:mm');

    } else {
      const dotNetDate = moment.utc(this.schedulingDate);
      this.date = dotNetDate.format('L');
      this.time = dotNetDate.format('HH:mm');
    }

    if (this.serviceType.length > 0) {
      const totalServicesDuration = this.serviceType
        .map(p => parseInt(p.duration))
        .reduce((acumulador: number, valorAtual: number) => acumulador + valorAtual, 0);
      const dotNetDate = moment.utc(this.schedulingDate).add(totalServicesDuration, 'minutes');
      this.endOfSchedule = dotNetDate.toISOString();
      this.endTime = dotNetDate.format('HH:mm');

    }

  }
}
