import { AppColors } from "src/app/Models/Enums/app-colors.enum";

export interface DefaultTable {
  titles: string[],
  titlesToHide?: string[],
  objects: DefaultObjectInTable[],
  buttons?: DefaultButtonInTable[],
  onClick?: (event: any) => any;
}

export interface DefaultObjectInTable {
  object: any,
  fontawesomeIcon?: string,
  imgUrl?: string,
  iconBgColor?: AppColors | string
}

export interface DefaultButtonInTable {
  label?: string,
  fontawesomeIcon?: string,
  imgUrl?: string,
  bgColor?: AppColors | string,
  roundedPill?: boolean;
  checkbox?: boolean;
  radio?: boolean;
  onClick?: (event: any) => any;
}
