export interface Contact {
  contactId: number
  customer: number
  email: string
  firstName: string
  lastName: string
  jobTitle: string
  phones: Array<{
    contact: number
    id: number
    name: string
    phone: string
  }>
}
