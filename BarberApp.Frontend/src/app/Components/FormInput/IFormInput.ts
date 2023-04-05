export interface IFormInput {
  id: string;
  label: string;
  type: string;
  value: any[] | any;
  formOptions?: IFormOptions[];
  options?: IOptions;
  currency?: boolean;
  alert?: string;
}

export interface IFormOptions{
  id: string;
  label: string | string[];
  value: any;
  isSelected?: boolean;
}

export interface IOptions{
  min: string;
  max?: string;
  showTotal?: boolean;
}
