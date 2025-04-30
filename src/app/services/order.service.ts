import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private STORAGE_KEY = 'orders';

  private getOrders(): Order[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveOrders(orders: Order[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
  }

  getAllOrders(): Order[] {
    return this.getOrders();
  }

  getUserOrders(username: string): Order[] {
    return this.getOrders().filter(order => order.user === username);
  }

  createOrder(order: Order) {
    console.log(order);
    const orders = this.getOrders();
    orders.push(order);
    this.saveOrders(orders);
  }

  updateOrder(updatedOrder: Order) {
    const orders = this.getOrders().map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    this.saveOrders(orders);
  }

  deleteOrder(orderId: number, username: string) {
    const orders = this.getOrders().filter(o => o.id !== orderId || o.user !== username);
    this.saveOrders(orders);
  }

  checkOrderStatus(): void {
    const orders = this.getAllOrders();
    const now = new Date().getTime();
  
    const updatedOrders = orders.map(order => {
      const orderTime = new Date(order.timestamp).getTime();
      const totalDuration = order.motos.reduce((acc, m) => acc + m.quantity, 0); // суммируем все часы
      const minutesElapsed = (now - orderTime) / 1000 / 60;
  
      if (order.status === 'ongoing' && minutesElapsed >= totalDuration * 60) {
        // Приводим status к правильному типу
        return { ...order, status: 'completed' as 'completed' }; 
      }
  
      return order;
    });
  
    this.saveOrders(updatedOrders);
  }
}
