import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-6">
      <h3 class="text-lg font-bold text-chocolate mb-3 font-serif">Genre</h3>
      <div class="space-y-2">
        <button 
          *ngFor="let genre of genres"
          (click)="selectGenre(genre)"
          [class.bg-gradient-autumn]="selectedGenre === genre"
          [class.text-vanilla]="selectedGenre === genre"
          [class.bg-cozy-cream]="selectedGenre !== genre"
          [class.text-chocolate]="selectedGenre !== genre"
          class="w-full px-4 py-2 rounded-lg font-sans transition-all text-left">
          {{ genre }}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class GenreFilterComponent {
  @Input() genres: string[] = [];
  @Input() selectedGenre: string = 'All';
  @Output() genreSelected = new EventEmitter<string>();

  selectGenre(genre: string): void {
    this.selectedGenre = genre;
    this.genreSelected.emit(genre);
  }
}

