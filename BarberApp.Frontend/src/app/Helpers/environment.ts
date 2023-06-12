export const environment = {
  production: false,
  apiUrl: 'http://192.168.1.71:5066',
  userLevel: {
    admin:                  0,
    manager:                1,
    readAndEdit:            2,
    editPresenceOnly:       3,
    readonly:               4,
  },
  dynamicRoutes: [
    {
      route: '/Classes',
      key: 'routeClasses',
      initialValue: 'Turmas',
    },
    {
      route: '/Clients',
      key: 'routeClients',
      initialValue: 'Alunos',
    },
  ]
};

export enum UserLevel{
  'Administrador',
  'Criar e editar',
  'Editar',
  'Alterar apenas presença',
  'Apenas visualizar',
}
