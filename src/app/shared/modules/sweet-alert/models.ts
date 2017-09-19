// Sweet Alert Config Model

export interface ConfigModel {
  title: string,
  message: string,
  type?: string,
  animationType?: string,
  isConfirm?: boolean,
  okButtonText?: string,
  cancelButtonText?: string,
  showCancelButton?: boolean
}