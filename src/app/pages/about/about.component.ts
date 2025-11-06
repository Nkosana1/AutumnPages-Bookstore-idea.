import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-bold text-chocolate mb-8 font-serif text-center">About AutumnPages</h1>
        <div class="bg-gradient-card rounded-xl p-8 space-y-6">
          <p class="text-lg text-charcoal font-sans leading-relaxed">
            Welcome to AutumnPages, where every book tells a story and every page holds warmth. 
            We're passionate about connecting readers with their next favorite book.
          </p>
          <p class="text-lg text-charcoal font-sans leading-relaxed">
            Our carefully curated collection features books across all genres, from fiction to non-fiction, 
            mystery to romance. Each book is selected with care, ensuring quality and value for our readers.
          </p>
          <p class="text-lg text-charcoal font-sans leading-relaxed">
            At AutumnPages, we believe in the power of stories to inspire, educate, and entertain. 
            Join us on this literary journey.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {
}

