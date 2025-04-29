import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  getCart() {
    return this.cart;
  }

  addToCart(moto: any) {
    this.cart.push(moto);
    this.saveCart();
  }

  removeFromCart(motoId: number) {
    this.cart = this.cart.filter(item => item.id !== motoId);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getTotalPrice() {
    return this.cart.reduce((total, moto) => total + (moto.hourlyRate || 0), 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}