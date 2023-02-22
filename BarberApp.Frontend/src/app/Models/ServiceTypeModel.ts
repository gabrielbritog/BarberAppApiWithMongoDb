export class ServiceTypeModel {
  serviceTypeId = "";
  nameService = "";
  valueService = 0;
  duration = "";
  on = true;

  constructor(params?: Partial<ServiceTypeModel>) {
    if (!params)
      return;

    Object.assign(this, params);
  }
}
