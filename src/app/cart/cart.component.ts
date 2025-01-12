import {Component, Input} from '@angular/core';
import {Cart} from "../../types";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent {
  @Input() cart: Cart;

  constructor() {
  }

}
