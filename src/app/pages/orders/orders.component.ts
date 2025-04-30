import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CancelOrderDialogComponent } from '../../components/cancel-order-dialog/cancel-order-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReviewService } from '../../services/review.service';
import { ReviewDialogComponent } from '../../components/review-dialog/review-dialog.component';
import { Moto } from '../../models/moto.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    CurrencyPipe,
    DatePipe, MatDividerModule, MatIconModule
  ],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  username: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser') || '';
    this.loadOrders();
  }

  statuses: Array<'ongoing' | 'completed' | 'canceled'> = ['ongoing', 'completed', 'canceled'];

  getOrdersByStatus(status: 'ongoing' | 'completed' | 'canceled'): Order[] {
    return this.orders.filter(o => o.status === status);
  }

  openReviewDialog(moto: Moto) {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: { motoId: moto.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const review: Review = {
          motoId: moto.id,
          user: this.username,
          text: result.text,
          rating: result.rating,
          timestamp: new Date().toISOString()
        };
        this.reviewService.addReview(review);
      }
    });
  }

  loadOrders() {
    this.orderService.checkOrderStatus();
    this.orders = this.orderService.getUserOrders(this.username);
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId, this.username);
    this.loadOrders();
  }

  cancelOrder(orderId: number) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    const dialogRef = this.dialog.open(CancelOrderDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        order.status = 'canceled';
        this.orderService.updateOrder(order);
        this.loadOrders();
      }
    });
  }

  getTotalHours(order: Order): number {
    return order.motos.reduce((sum, m) => sum + m.quantity, 0);
  }

  getTotalPrice(order: Order): number {
    return order.motos.reduce((sum, m) => sum + m.moto.hourlyRate * m.quantity, 0);
  }

}