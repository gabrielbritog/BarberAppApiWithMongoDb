export interface ClientAvaliation{
  activities: string[],
  objectives?: string[],
  athleticActivites?: CustomObject[],
  athleticActivitesSpecified?: string[],
  diseases?: CustomObject[],
  alergies?: CustomObject[],
  smoker?: boolean,
  medication?: string,
  treatment?: string[],
  observation?: string,

  weigth?: number,
  height?: number,
  imc?: string,

  employeeId: string,
  avaliationDate: string,
  returnDate: string
}

export interface CustomObject{
  key: string,
  value: string,
}
