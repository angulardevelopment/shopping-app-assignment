import {Component} from '@angular/core';
import {Cart, Product} from "../types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Product[];
  cart: Cart;
  id =0;

  constructor() {
    this.cart = {
      items: []
    } as Cart
  }

  ngOnInit() {
    this.products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/assets/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      product.isEnable = true;
      return product;
    });
  }

  // emit data receiver
  addToCart(product: Product) {
      this.cart.items.push({'item':product.name, 'quantity': product.cartQuantity, id: this.id});

  }

  // emitter
  updateCart(product: Product) {
    this.cart.items.forEach(element => {
      if (element.item === product.name) {
        element.quantity = product.cartQuantity;
      }
    });
  }

  // event emitter
  removeItem(product: Product) {

  }
}




export const PRODUCTS: Product[] = [
  {
    name: "Cap",
    price: 5
  },
  {
    name: "HandBag",
    price: 30
  },
  {
    name: "Shirt",
    price: 35
  },
  {
    name: "Shoe",
    price: 50
  },
  {
    name: "Pant",
    price: 35
  },
  {
    name: "Slipper",
    price: 25
  }
];
