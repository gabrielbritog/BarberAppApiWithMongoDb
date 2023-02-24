export class WorkingDays {
  day = "";
  openingTime = "";
  closingTime = "";
  isOpen = true;

  constructor(params?: Partial<WorkingDays>) {
    if (params)
      Object.assign(this, params);
  }
}
