export interface Product {
  name: string;
  price: number;
  id?: number;
  image?: string;
  cartQuantity?: number;
}

export enum UpdateMode {
  SUBTRACT,
  ADD
}
