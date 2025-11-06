import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type"
      [class]="buttonClass"
      (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class PrimaryButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get buttonClass(): string {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };
    return `bg-gradient-autumn hover:bg-deep-rust text-vanilla rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md ${sizeClasses[this.size]}`;
  }

  onClick(): void {
    // Handle click if needed
  }
}

