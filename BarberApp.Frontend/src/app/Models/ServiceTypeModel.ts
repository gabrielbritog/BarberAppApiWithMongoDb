export class ServiceTypeModel {
  serviceTypeId = "";
  nameService = "";
  valueService = 0;
  on = true;

  constructor(params?: Partial<ServiceTypeModel>) {
    if (!params)
      return;

    Object.assign(this, params);
  }
}
