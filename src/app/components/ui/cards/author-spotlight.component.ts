import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-author-spotlight',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="author" class="bg-gradient-card rounded-xl p-8 border border-soft-taupe">
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <img [src]="author.image" 
             [alt]="author.name"
             loading="lazy"
             class="w-32 h-32 rounded-full object-cover border-4 border-autumn-orange shadow-lg">
        <div class="flex-1 text-center md:text-left">
          <h3 class="text-3xl font-bold text-chocolate mb-2 font-serif">Featured Author</h3>
          <h4 class="text-2xl font-semibold text-autumn-orange mb-3 font-serif">{{ author.name }}</h4>
          <p class="text-charcoal mb-4 font-sans line-clamp-3">{{ author.bio }}</p>
          <div class="flex items-center justify-center md:justify-start space-x-4">
            <button 
              (click)="toggleFollow()"
              [class.bg-gradient-autumn]="!isFollowing"
              [class.bg-soft-taupe]="isFollowing"
              class="text-vanilla px-6 py-2 rounded-lg font-semibold transition-all">
              {{ isFollowing ? 'Following' : 'Follow Author' }}
            </button>
            <span class="text-charcoal font-sans">{{ author.followers }} followers</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class AuthorSpotlightComponent {
  @Input() author: Author | null = null;
  isFollowing = false;

  toggleFollow(): void {
    this.isFollowing = !this.isFollowing;
    // TODO: Implement follow functionality
  }
}

