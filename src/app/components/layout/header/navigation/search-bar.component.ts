import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../../../services/search.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="relative">
      <button 
        (click)="toggleSearch()"
        class="text-vanilla hover:text-mustard transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
      <div *ngIf="isSearchOpen" 
           class="absolute right-0 top-12 bg-vanilla rounded-lg shadow-xl p-4 w-96 z-50">
        <input 
          type="text" 
          [(ngModel)]="searchQuery"
          (input)="onSearch()"
          (focus)="showSuggestions = true"
          placeholder="Search books, authors..."
          class="w-full px-4 py-2 border border-soft-taupe rounded-lg text-chocolate focus:outline-none focus:ring-2 focus:ring-autumn-orange font-sans">
        
        <!-- Autocomplete Suggestions -->
        <div *ngIf="showSuggestions && suggestions.length > 0" 
             class="mt-2 border border-soft-taupe rounded-lg bg-vanilla max-h-60 overflow-y-auto">
          <a *ngFor="let suggestion of suggestions"
             [routerLink]="['/books']"
             [queryParams]="{searchQuery: suggestion}"
             (click)="selectSuggestion(suggestion)"
             class="block px-4 py-2 hover:bg-cozy-cream text-chocolate font-sans cursor-pointer">
            {{ suggestion }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SearchBarComponent implements OnInit, OnDestroy {
  isSearchOpen = false;
  searchQuery = '';
  suggestions: string[] = [];
  showSuggestions = false;
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      if (query.length >= 2) {
        this.searchService.getAutocompleteSuggestions(query).subscribe((suggestions: string[]) => {
          this.suggestions = suggestions;
        });
      } else {
        this.suggestions = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.showSuggestions = false;
      this.suggestions = [];
    }
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.toggleSearch();
  }
}

