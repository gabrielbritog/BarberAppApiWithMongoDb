import { ClientModel } from "./ClientModel";

export interface ClassesModel {
  id?: string,
  name: string,
  clients: ClientModel[],
  presence: string[]
}
