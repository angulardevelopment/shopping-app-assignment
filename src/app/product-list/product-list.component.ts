import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Product, UpdateMode} from "../../types";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  preserveWhitespaces: false,

  standalone: false
  
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter();
  @Output() onQuantityUpdate: EventEmitter<Product> = new EventEmitter();
  @Output() removeQuantity: EventEmitter<Product> = new EventEmitter();

  add = 0;
  ngOnInit() {

  }

  ngAfterViewInit(){
    // let dsc = document.querySelector('p');
    // dsc.style.color = "blue";
    // dsc.innerHTML = `<style> p{color:blue} </style> + adcxs
    // `;
  }

  updateCartData(product){
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
    if (product.cartQuantity > 1) {
    this.onQuantityUpdate.emit(this.products[i]);
    }
    if (product.cartQuantity === 0) {
      this.products.forEach(element => {
        if (element.name === product.name) {
          element.cartQuantity = 0;
        }
      });
    this.removeQuantity.emit(this.products[i]);
    }
  }

}


