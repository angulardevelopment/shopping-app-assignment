export interface CartItem {
  id: number;
  item: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
