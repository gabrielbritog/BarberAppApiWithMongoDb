import { ClientModel } from "./ClientModel";
import { GlobalVariables } from '../Helpers/GlobalVariables';

export interface ClassesModel {
  id?: string,
  userId?: string,
  name: string,
  clientsId: string[],
  presencesId: string[]
}
export interface ClassesFrontModel {
  id?: string,
  name: string,
  clientsModel: ClientModel[],
  clientsPresence: ClientModel[]
}

export class ClassesUtilities{
  static convertApiModelToFrontModel(original: ClassesModel) {
    const clients = GlobalVariables.clients
      .filter(p => p.clientId && original.clientsId.includes(p.clientId));
    const clientsPresence = GlobalVariables.clients
      .filter(p => p.clientId && original.presencesId.includes(p.clientId));

    const frontModel: ClassesFrontModel = {
      id: original.id,
      name: original.name,
      clientsModel: clients,
      clientsPresence: clientsPresence
    }

    return frontModel;
  }

  static convertFrontModelToApiModel(original: ClassesFrontModel) {
    const clients = original.clientsModel.map(p=> p.clientId!);
    const clientsPresence = original.clientsPresence.map(p=> p.clientId!);

    const apiModel: ClassesModel = {
      id: original.id,
      name: original.name,
      clientsId: clients,
      presencesId: clientsPresence
    }

    return apiModel;
  }
}
