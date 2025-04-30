import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private STORAGE_KEY = 'reviews';

  private getAll(): Review[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getReviewsForMoto(motoId: number): Review[] {
    return this.getAll().filter(r => r.motoId === motoId);
  }

  addReview(review: Review): void {
    const reviews = this.getAll();
    console.log(review);
    reviews.push(review);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
  }

  getUserReviews(username: string): Review[] {
    return this.getAll().filter(r => r.user === username);
  }

  deleteReview(motoId: number, timestamp: string, user: string) {
    const all = this.getAll();
    const updated = all.filter(
      r => !(r.motoId === motoId && r.timestamp === timestamp && r.user === user)
    );
  
    localStorage.setItem('reviews', JSON.stringify(updated));
  }
}