import { WorkingDays } from "./WorkingDays";
export class BarberModel {
  barberId?: string;
  userId?: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  urlImage?: string;
  password!: string;
  urlImagem?: string;
  phoneNumber?: string;
  userRegistration?: string;
  disabled?: boolean;
  workingDays?: WorkingDays[];

  constructor(params?: Partial<BarberModel>) {
    if (params)
      Object.assign(this, params);
  }
}
