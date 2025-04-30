import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Moto } from '../models/moto.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private STORAGE_KEY = 'cart';

  private getCart(): CartItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }

  getItems(): CartItem[] {
    return this.getCart();
  }

  addToCart(moto: Moto) {
    const cart = this.getCart();
    const existing = cart.find(item => item.moto.id === moto.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ moto, quantity: 1 });
    }
    console.log(moto);
    this.saveCart(cart);
  }

  removeFromCart(motoId: number) {
    const cart = this.getCart().filter(item => item.moto.id !== motoId);
    this.saveCart(cart);
  }

  updateQuantity(motoId: number, change: number) {
    const cart = this.getCart();
    const item = cart.find(i => i.moto.id === motoId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(motoId);
      } else {
        this.saveCart(cart);
      }
    }
  }

  clearCart() {
    this.saveCart([]);
  }
}