import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReviewService } from '../../services/review.service';
import { Moto } from '../../models/moto.model';
import { Review } from '../../models/review.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-moto-details-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule, MatCardModule],
  templateUrl: './moto-details-dialog.component.html',
  styleUrls: ['./moto-details-dialog.component.css']
})
export class MotoDetailsDialogComponent  implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MotoDetailsDialogComponent>,
    private reviewService: ReviewService
  ) {}

  reviews: Review[] = [];
  ngOnInit(): void {
    console.log(this.data.id);
    this.reviews = this.reviewService.getReviewsForMoto(this.data.id);
    console.log(this.reviews);
  }
  currentUser = localStorage.getItem('currentUser') || '';
  deleteReview(review: Review) {
    this.reviewService.deleteReview(review.motoId, review.timestamp, review.user);
    this.reviews = this.reviewService.getReviewsForMoto(review.motoId); // обновим список
  }
}
