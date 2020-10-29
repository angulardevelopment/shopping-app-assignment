import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, UpdateMode} from "../../types";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter();
  @Output() onQuantityUpdate: EventEmitter<Product> = new EventEmitter();

  add = 0;
  ngOnInit() {

  }

  updatecart(product){
    this.add = 0;
    product.isEnable = false;
    this.onAddToCart.emit(product);
  }

  addData(product, i){

    this.products.forEach(element => {
      if (element.name === product.name) {
        element.cartQuantity += 1;
      }
    });

    this.onQuantityUpdate.emit(this.products[i]);

  }

  removeData(product, i){
    this.products.forEach(element => {
      if (element.name === product.name) {
        element.cartQuantity -= 1;
      }
    });
    this.onQuantityUpdate.emit(this.products[i]);
  }

}


