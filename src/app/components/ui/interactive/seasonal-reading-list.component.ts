import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../../../models/book.interface';

@Component({
  selector: 'app-seasonal-reading-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gradient-card rounded-xl p-6 border border-soft-taupe">
      <h3 class="text-2xl font-bold text-chocolate mb-4 font-serif">{{ title }}</h3>
      <p class="text-charcoal mb-6 font-sans">{{ description }}</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div *ngFor="let book of books" 
             class="cursor-pointer hover:scale-105 transition-transform"
             [routerLink]="['/books', book.id]">
          <img [src]="book.coverImage" 
               [alt]="book.title"
               class="w-full h-48 object-cover rounded-lg shadow-md mb-2">
          <p class="text-sm font-serif text-chocolate truncate">{{ book.title }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SeasonalReadingListComponent {
  @Input() title = 'Seasonal Reading List';
  @Input() description = 'Curated books perfect for this season';
  @Input() books: Book[] = [];
}

