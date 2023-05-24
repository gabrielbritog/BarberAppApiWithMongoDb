export interface IFormInput {
  id: string;
  label: string;
  type: string;
  value: any[] | any;
  formOptions?: IFormOptions[];
  options?: IOptions;
  currency?: boolean;
  alert?: string;
  disabled?: boolean;
}

export interface IFormOptions{
  id: string;
  label: string | string[];
  value: any;
  isSelected?: boolean;
}

export interface IOptions{
  min?: string;
  max?: string;
  showTotal?: boolean;
  required?: boolean;
  mask?: 'cep' | 'tel' | 'cpf' | 'rg' | 'number'
}

export interface ExtraBtn{
  label: string;
  onClick: () => void;
}
