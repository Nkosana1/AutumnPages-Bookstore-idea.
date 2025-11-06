import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3 class="text-lg font-bold text-red-800 font-serif mb-2">{{ title || 'An Error Occurred' }}</h3>
      <p class="text-red-600 font-sans">{{ message || 'Please try again later.' }}</p>
    </div>
  `,
  styles: []
})
export class ErrorMessageComponent {
  @Input() title?: string;
  @Input() message?: string;
}

