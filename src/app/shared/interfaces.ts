export interface IUser {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export type productType = 'Phone' | 'Tablet' | 'Laptop';

export interface IProduct {
  type: productType,
  title: string,
  photo: string,
  info: string,
  price: number,
  date: Date,
  id?: string
}

export interface IFbResponse {
  name: string
}

