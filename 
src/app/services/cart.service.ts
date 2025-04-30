import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Moto } from '../models/moto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
