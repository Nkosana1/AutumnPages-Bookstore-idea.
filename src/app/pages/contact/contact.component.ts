import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-bold text-chocolate mb-8 font-serif text-center">Contact Us</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gradient-card rounded-xl p-8">
            <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Get in Touch</h2>
            <p class="text-charcoal font-sans mb-6">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div class="space-y-4">
              <div>
                <p class="font-semibold text-chocolate font-serif">Email</p>
                <p class="text-charcoal font-sans">contact@autumnpages.com</p>
              </div>
              <div>
                <p class="font-semibold text-chocolate font-serif">Phone</p>
                <p class="text-charcoal font-sans">+1 (555) 123-4567</p>
              </div>
              <div>
                <p class="font-semibold text-chocolate font-serif">Address</p>
                <p class="text-charcoal font-sans">123 Book Street<br>Reading, RD 12345</p>
              </div>
            </div>
          </div>
          <div class="bg-gradient-card rounded-xl p-8">
            <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Send a Message</h2>
            <form class="space-y-4">
              <input type="text" placeholder="Your Name" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
              <input type="email" placeholder="Your Email" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
              <textarea placeholder="Message" rows="6" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans"></textarea>
              <button type="submit" class="w-full bg-gradient-autumn hover:bg-deep-rust text-vanilla py-3 rounded-lg font-semibold transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent {
}

