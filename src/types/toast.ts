
export enum NotificationType {
  Success = "Success",
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}

export interface IToast {
  id: number,
  message: string,
  type: NotificationType
}
