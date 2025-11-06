import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden bg-gradient-hero">
      <div class="absolute inset-0 bg-cover bg-center opacity-30" 
           style="background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80');"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-vanilla mb-6 font-playfair drop-shadow-lg">
            Welcome to AutumnPages
          </h1>
          <p class="text-xl md:text-2xl text-vanilla mb-8 max-w-3xl mx-auto font-crimson drop-shadow-md">
            Discover your next favorite book in our cozy collection. 
            Where stories come alive and pages turn with warmth.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/books" 
               class="bg-chocolate hover:bg-deep-rust text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
              Explore Books
            </a>
            <button 
              class="bg-transparent border-2 border-vanilla hover:bg-vanilla hover:text-chocolate text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
              Browse Categories
            </button>
          </div>
        </div>
      </div>
      <!-- Decorative autumn elements -->
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cozy-cream to-transparent"></div>
    </div>
  `,
  styles: [`
    .font-playfair {
      font-family: 'Playfair Display', serif;
    }
    .font-crimson {
      font-family: 'Crimson Text', serif;
    }
  `]
})
export class HeroComponent {
}

