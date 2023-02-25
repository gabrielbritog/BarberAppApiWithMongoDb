export class UserConfig {
  darkmode = true;
  primaryColor = "#ff9000";
  secondaryColor = "#518fa3";
  altColor = "#f4ede8";
  fontSize = "16px";
  dueDate = "2023-02-24T04:59:08.260Z";


  constructor(params?: Partial<UserConfig>) {
    if (!params)
      return;

    Object.assign(this, params);
  }
}
