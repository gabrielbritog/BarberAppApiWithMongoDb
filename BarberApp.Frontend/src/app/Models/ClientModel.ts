export class ClientModel {
  name: string = "";
  phone: string = "";

  constructor(params?: Partial<ClientModel>) {
    if (!params)
      return;

    Object.assign(this, params);
  }
}
