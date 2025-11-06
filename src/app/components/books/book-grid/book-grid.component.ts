import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../../models/book.interface';

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <app-book-card 
        *ngFor="let book of books" 
        [book]="book">
      </app-book-card>
    </div>
  `,
  styles: []
})
export class BookGridComponent {
  @Input() books: Book[] = [];
}

