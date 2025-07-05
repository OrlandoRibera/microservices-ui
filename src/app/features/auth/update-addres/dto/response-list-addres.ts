export interface UserAddressByIDResponse {
  Id: string;
  Name: string;
  Phone: number;
  email: number;
  addresses: ListAddressResponse[];
}

export interface ListAddressResponse {
  id: string;
  street: string;
  city: number;
  latituded: number;
  longitud: Date;
  status: string;
}
