import { AppColors } from "src/app/Models/Enums/app-colors.enum";

export interface DefaultTable {
  titles: string[],
  titlesToHide?: string[],
  objects: DefaultObjectInTable[],
  onClick?: (event: any) => any;
}

export interface DefaultObjectInTable {
  object: any,
  fontawesomeIcon?: string,
  imgUrl?: string,
  iconBgColor?: AppColors
}
