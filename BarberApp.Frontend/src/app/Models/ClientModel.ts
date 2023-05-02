export interface ClientModel {
  clientId?: string,
  schedulingCount?: 0,
  name: string,
  phone: string,
  email?: string,
  age?: 0,
  dateOfBirth?: string,
  civilStatus?: 0,
  rg?: string,
  cpf?: string,
  adress?: {
    street: string,
    city: string,
    cpf: string,
    zone: string,
    uf: string,
    number: string,
    country: string,
    cep: string
  },
  retiree?: true,
  occupation?: string,
  emergencyContact?: {
    phone: string,
    phoneResidential: string,
    kinship: string,
    name: string
  },
  death?: true,
  classesId?: [
    string
  ],
  observation?: string,
  registerNumber?: string,
  interviewNumber?: string
}

export class ClientModelHelper {

  static create(): ClientModel {
    return {
      name: '',
      phone: '',
    };
  }

  static clone(model?: ClientModel): ClientModel {
    const clone: ClientModel = {
      name: '',
      phone: '',
    };
    return Object.assign(clone, model);
  }
}
