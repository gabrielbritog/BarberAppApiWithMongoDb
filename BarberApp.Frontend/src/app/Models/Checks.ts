import { GlobalVariables } from "../Helpers/GlobalVariables"

export interface Checks {
  title: string,
  listChecks: [
    {
      name: string,
      isChecked: boolean
    }
  ],
  observation: string
}

export class ChecksUtilities {
  getDefaultChecks() {
    const companyChecks: Checks = GlobalVariables.companyUserConfig?.checks ?? {
      title: 'Título do grupo',
      listChecks: [
        {
          name: 'Nome do item',
          isChecked: false,
        }
      ],
      observation: ''
    };

    return companyChecks;
  }
}
