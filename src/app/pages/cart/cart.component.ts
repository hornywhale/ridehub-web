import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service'; // если есть
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, CurrencyPipe, CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatIconModule, NgFor, CurrencyPipe, MatDividerModule, CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService, // если используешь
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.cartItems = this.cartService.getItems();
  }

  increment(motoId: number) {
    this.cartService.updateQuantity(motoId, +1);
    this.refresh();
  }

  decrement(motoId: number) {
    this.cartService.updateQuantity(motoId, -1);
    this.refresh();
  }

  removeItem(motoId: number) {
    this.cartService.removeFromCart(motoId);
    this.refresh();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.moto.hourlyRate * item.quantity, 0
    );
  }

  placeOrder() {
    const user = localStorage.getItem('currentUser'); // или другой метод получения
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const order = {
      id: Date.now(),
      user,
      motos: this.cartItems.map(item => ({
        moto: item.moto,
        quantity: item.quantity
      })),
      timestamp: new Date().toISOString(),
      status: 'ongoing' as const
    };

    this.orderService.createOrder(order);
    this.cartService.clearCart();
    alert('Order placed successfully! ✅');
    this.router.navigate(['/orders']);
  }
}