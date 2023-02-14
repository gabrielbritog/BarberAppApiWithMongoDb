export class ScheduleModel {
  clientName: string = "";
  date: string = "";
  time: string = "";

  constructor(params?: Partial<ScheduleModel>) {
    if (params)
      Object.assign(this, params);
  }
}
