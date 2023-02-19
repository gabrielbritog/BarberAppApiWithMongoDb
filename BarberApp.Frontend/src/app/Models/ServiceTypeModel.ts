export class ServiceTypeModel {
  nameService: string = "";
  valueService: number = 0;

  constructor(params?: Partial<ServiceTypeModel>) {
    if (!params)
      return;

    Object.assign(this, params);
  }
}
