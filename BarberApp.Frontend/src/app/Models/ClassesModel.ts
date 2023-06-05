import { ClientModel } from "./ClientModel";
import { GlobalVariables } from '../Helpers/GlobalVariables';
import { ServiceTypeModel } from "./ServiceTypeModel";

export interface ClassesModel {
  id?: string,
  userId?: string,
  name: string,
  clientsId: string[],
  servicesId: string[]
}

export interface ClassesFrontModel {
  id?: string,
  name: string,
  clientsModel: ClientModel[],
  services: ServiceTypeModel[]
}

export class ClassesUtilities{
  static convertApiModelToFrontModel(original: ClassesModel) {
    const clients = GlobalVariables.clients
      .filter(p => p.clientId && original.clientsId.includes(p.clientId));
    const services = GlobalVariables.serviceTypes
      .filter(p => p.serviceTypeId && original.servicesId?.includes(p.serviceTypeId));

    const frontModel: ClassesFrontModel = {
      id: original.id,
      name: original.name,
      clientsModel: clients,
      services: services
    }

    return frontModel;
  }

  static convertFrontModelToApiModel(original: ClassesFrontModel) {
    const clients = original.clientsModel.map(p=> p.clientId!);
    const services = original.services.map(p=> p.serviceTypeId!);

    const apiModel: ClassesModel = {
      id: original.id,
      name: original.name,
      clientsId: clients,
      servicesId: services
    }

    return apiModel;
  }
}
