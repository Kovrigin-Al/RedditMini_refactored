
export enum NotificationType {
  Success = "Success",
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}

export interface IToast {
  id: string,
  message: string,
  type: NotificationType
}
