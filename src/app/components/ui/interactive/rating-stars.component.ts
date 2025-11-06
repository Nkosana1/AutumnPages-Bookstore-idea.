import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-1">
      <button 
        *ngFor="let star of [1, 2, 3, 4, 5]; let i = index"
        (click)="onRatingClick(i + 1)"
        (mouseenter)="hoveredRating = i + 1"
        (mouseleave)="hoveredRating = 0"
        [class.text-warm-amber]="(hoveredRating || rating) >= i + 1"
        [class.text-soft-taupe]="(hoveredRating || rating) < i + 1"
        class="transition-colors">
        <svg class="w-6 h-6" [class.fill-current]="(hoveredRating || rating) >= i + 1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </button>
      <span *ngIf="showRating" class="ml-2 text-sm text-charcoal font-sans">{{ rating }}/5</span>
    </div>
  `,
  styles: []
})
export class RatingStarsComponent {
  @Input() rating = 0;
  @Input() showRating = false;
  @Input() editable = false;
  @Output() ratingChange = new EventEmitter<number>();
  hoveredRating = 0;

  onRatingClick(rating: number): void {
    if (this.editable) {
      this.rating = rating;
      this.ratingChange.emit(rating);
    }
  }
}

