import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-order-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.css']
})
export class CancelOrderDialogComponent {
  constructor(public dialogRef: MatDialogRef<CancelOrderDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}