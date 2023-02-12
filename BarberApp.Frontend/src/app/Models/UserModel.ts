export class UserModel {
  userId?: string;
  firstName!: string;
  lastName!: string;
  cep?: string;
  email!: string;
  urlImage?: string;
  password!: string;
  phoneNumber?: string;
  userLevel?: number;
  urlImagem?: string;
  userRegistration?: string;

  constructor(params?: Partial<UserModel>) {
    if (params)
      Object.assign(this, params);
  }
}
