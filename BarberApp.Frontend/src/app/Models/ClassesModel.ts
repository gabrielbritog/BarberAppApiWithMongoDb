import { ClientModel } from "./ClientModel";

export interface ClassesModel {
  id?: number,
  name: string,
  clients: ClientModel[],
  presence: ClientModel[]
}
