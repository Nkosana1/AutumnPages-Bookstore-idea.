import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-16">
      <svg class="w-24 h-24 mx-auto text-soft-taupe mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="iconPath"/>
      </svg>
      <h3 class="text-2xl font-bold text-chocolate font-serif mb-2">{{ title || 'No items found' }}</h3>
      <p class="text-charcoal font-sans">{{ message || 'Try adjusting your filters or search terms.' }}</p>
    </div>
  `,
  styles: []
})
export class EmptyStateComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() iconPath = 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
}

