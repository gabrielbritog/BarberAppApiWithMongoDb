export class UserModel {
  firstName!: string;
  lastName!: string;
  cep?: string;
  email!: string;
  urlImage?: string;
  password!: string;
  phoneNumber?: string;
  userLevel?: number;

  constructor(params?: Partial<UserModel>) {
    if (params)
      Object.assign(this, params);
  }
}
