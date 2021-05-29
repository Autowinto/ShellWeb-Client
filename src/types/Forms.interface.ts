export interface FormField {
  key: string
  label: string
  cols: number
  show: boolean
  formOptions: FormOptions
}

export interface FormOptions {
  keys: {
    key: string
    value: string
  }
  baseUrl: string
}

export interface FormFields {
  [index: number]: FormField[]
}
