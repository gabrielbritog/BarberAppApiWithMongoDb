import { UserConfig } from './UserConfig';
import { WorkingDays } from './WorkingDays';
export class UserModel {
  userId?: string;
  barberId?: string;
  companyName?: string;
  firstName!: string;
  lastName!: string;
  cep?: string;
  email!: string;
  urlImage?: string;
  password!: string;
  phoneNumber?: string;
  userLevel?: number;
  userRegistration?: string;
  workingDays?: WorkingDays[];
  userConfig = new UserConfig();


  constructor(params?: Partial<UserModel>) {
    if (params)
      Object.assign(this, params);
  }
}
