export class WorkingDays {
  index = 0;
  day = "";
  openingTime = "";
  closingTime = "";
  intervalTime = 0;
  isOpen = true;

  constructor(params?: Partial<WorkingDays>) {
    if (params)
      Object.assign(this, params);
  }
}
