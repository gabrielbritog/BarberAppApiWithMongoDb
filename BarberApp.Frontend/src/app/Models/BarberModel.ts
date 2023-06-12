import { UserConfig } from "./UserConfig";
import { WorkingDays } from "./WorkingDays";
export class BarberModel {
  userId?: string;
  barberId?: string;
  companyName?: string;
  firstName!: string;
  lastName!: string;
  // cep?: string;
  email!: string;
  urlImage?: string;
  password!: string;
  phoneNumber?: string;
  userLevel?: number;
  userRegistration?: string;
  workingDays?: WorkingDays[];
  userConfig = new UserConfig();
  disabled?: boolean;


  constructor(params?: Partial<BarberModel>) {
    if (params)
      Object.assign(this, params);
  }
}
