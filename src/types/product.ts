export interface Product {
  name: string;
  price: number;
  id?: number;
  image?: string;
  cartQuantity?: number;
  isEnable?: boolean;
}

export enum UpdateMode {
  SUBTRACT,
  ADD
}
