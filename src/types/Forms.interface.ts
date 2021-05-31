export interface FormField {
  key: string
  label: string
  cols: number | undefined
  defaultValue: string | number | undefined
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
