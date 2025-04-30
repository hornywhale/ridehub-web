import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Moto } from '../../models/moto.model';
import { CartService } from '../../services/cart.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css'],
  imports: [MatDialogModule, RouterLink, MatIconModule, MatButtonModule]
})
export class AddToCartDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { moto: Moto },
    public dialogRef: MatDialogRef<AddToCartDialogComponent>,
    private cartService: CartService,
    private router: Router
  ) {}
  goToCart() {
    this.dialogRef.close();
    this.router.navigate(['/cart']);
  }
}