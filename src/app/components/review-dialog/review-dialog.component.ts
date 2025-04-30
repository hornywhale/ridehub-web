import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel, MatOption, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css'],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class ReviewDialogComponent {
  rating = new FormControl(5);
  text = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { motoId: number }
  ) {}

  submit() {
    if (this.text.value && this.rating.value) {
      this.dialogRef.close({
        text: this.text.value,
        rating: this.rating.value
      });
    }
  }
}