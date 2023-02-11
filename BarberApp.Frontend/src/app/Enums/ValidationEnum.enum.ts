export enum ValidationEnum {
  Ok = 0,
  EmptyFirstName = 1 << 0,
  EmptyLastName = 1 << 1,
  InvalidEmail = 1 << 2,
  InvalidPassword = 1 << 3,
  InvalidConfirmPassword = ~(~0 << 4)
}
