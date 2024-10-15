import { Component, OnInit } from '@angular/core';
import { Cart, Product } from "../types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Carousel properties
  currentSlide = 0;
  slides: any;

  // Shopping Cart properties
  products: Product[];
  cart: Cart;
  id = 0; // Unique ID for cart items

  constructor() {
    // Initialize the cart
    this.cart = { items: [] } as Cart;
  }

  ngOnInit() {
    // Initialize carousel slides
    this.slides = document.querySelectorAll('.carousel-slide');
    this.showSlide(this.currentSlide);

    // Enable auto-sliding every 3 seconds
    setInterval(() => {
      this.nextSlide();
    }, 3000);

    // Initialize products
    this.products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/assets/images/items/${product.name.toLowerCase()}.png`;
      product.cartQuantity = 0;
      product.isEnable = true;
      return product;
    });
  }

  // Carousel logic
  showSlide(index: number) {
    if (index >= this.slides.length) {
      this.currentSlide = 0;
    } else if (index < 0) {
      this.currentSlide = this.slides.length - 1;
    } else {
      this.currentSlide = index;
    }

    const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;
    carouselContainer.style.transform = `translateX(${-this.currentSlide * 100}%)`;
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  // Shopping Cart logic
  addToCart(product: Product) {
    const existingItem = this.cart.items.find(item => item.item === product.name);

    // If the product is already in the cart, just update its quantity
    if (existingItem) {
      existingItem.quantity += product.cartQuantity;
    } else {
      // Otherwise, add the new item to the cart
      this.cart.items.push({ item: product.name, quantity: product.cartQuantity, id: ++this.id });
    }
  }

  updateCart(product: Product) {
    const cartItem = this.cart.items.find(item => item.item === product.name);
    if (cartItem) {
      cartItem.quantity = product.cartQuantity;
    }
  }

  removeItem(item: { item: string, quantity: number }) {
    const itemIndex = this.cart.items.findIndex(cartItem => cartItem.item === item.item);
    if (itemIndex !== -1) {
      this.cart.items.splice(itemIndex, 1); // Remove the item from the cart
    }
  }
}

// Mock product data
export const PRODUCTS: Product[] = [
  { name: "Cap", price: 5 },
  { name: "HandBag", price: 30 },
  { name: "Shirt", price: 35 },
  { name: "Shoe", price: 50 },
  { name: "Pant", price: 35 },
  { name: "Slipper", price: 25 }
];
