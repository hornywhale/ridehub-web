import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, MatButtonModule, MatCardModule, NgFor]
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeMoto(motoId: number) {
    this.cartService.removeFromCart(motoId);
    this.cart = this.cartService.getCart(); // обновляем корзину
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}