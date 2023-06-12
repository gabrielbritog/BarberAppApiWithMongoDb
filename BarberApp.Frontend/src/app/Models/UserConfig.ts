import { AppColors } from './Enums/app-colors.enum';
export class UserConfig {
  darkmode = false;
  primaryColor: AppColors | string = 'main';
  secondaryColor = "#518fa3";
  altColor = "#f4ede8";
  fontSize = "16px";
  dueDate = "2023-02-24T04:59:08.260Z";
  checks?: {
    title: string,
    listChecks: [
      {
        name: string,
        isChecked: true
      }
    ],
    observation: string
  };
  pageTitles: any;


  constructor(params?: Partial<UserConfig>) {
    if (!params)
      return;

    Object.assign(this, params);
  }
}

export interface UserConfig{
  darkmode: boolean;
  primaryColor: AppColors | string,
  secondaryColor: string,
  altColor: string,
  fontSize: string,
  dueDate: string,
  checks?: {
    title: string,
    listChecks: [
      {
        name: string,
        isChecked: true
      }
    ],
    observation: string
  };
  pageTitles: any
}
