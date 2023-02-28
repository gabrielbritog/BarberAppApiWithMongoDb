export interface IFormInput {
  id: string;
  label: string;
  type: string;
  value: any[] | any;
  options?: IFormOptions[];
  currency?: boolean;
  alert?: string;
}

export interface IFormOptions{
  id: string;
  label: string;
  value: any;
  isSelected?: boolean;
}
