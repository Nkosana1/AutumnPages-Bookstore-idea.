import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [
    {
      id: 1,
      bookId: '1',
      userId: 1,
      userName: 'Book Lover',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      rating: 5,
      title: 'Absolutely wonderful!',
      comment: 'This book captured my heart from the first page. The autumn setting is beautifully described.',
      date: new Date('2024-01-15'),
      helpful: 23
    },
    {
      id: 2,
      bookId: '1',
      userId: 2,
      userName: 'Reading Enthusiast',
      rating: 4,
      title: 'Great read',
      comment: 'A cozy story perfect for fall reading. Highly recommend!',
      date: new Date('2024-01-10'),
      helpful: 15
    }
  ];

  getReviewsByBookId(bookId: string | number): Observable<Review[]> {
    const idStr = typeof bookId === 'string' ? bookId : String(bookId);
    return of(this.reviews.filter(r => {
      const rIdStr = typeof r.bookId === 'string' ? r.bookId : String(r.bookId);
      return rIdStr === idStr;
    }));
  }

  addReview(review: Review): Observable<Review> {
    review.id = this.reviews.length + 1;
    review.date = new Date();
    this.reviews.push(review);
    return of(review);
  }
}

