import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-gradient-autumn shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <svg class="w-8 h-8 text-vanilla" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              <span class="text-2xl font-bold text-vanilla font-accent">AutumnPages</span>
            </a>
          </div>
          <div class="hidden md:flex space-x-8">
            <a routerLink="/" 
               routerLinkActive="text-mustard" 
               [routerLinkActiveOptions]="{exact: true}"
               class="text-vanilla hover:text-mustard transition-colors font-sans text-lg">
              Home
            </a>
            <a routerLink="/books" 
               routerLinkActive="text-mustard"
               class="text-vanilla hover:text-mustard transition-colors font-sans text-lg">
              Books
            </a>
            <a routerLink="/" 
               fragment="about"
               class="text-vanilla hover:text-mustard transition-colors font-sans text-lg">
              About
            </a>
            <a routerLink="/" 
               fragment="contact"
               class="text-vanilla hover:text-mustard transition-colors font-sans text-lg">
              Contact
            </a>
          </div>
          <div class="flex items-center space-x-4">
            <button class="text-vanilla hover:text-mustard transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
            <button class="text-vanilla hover:text-mustard transition-colors relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span class="absolute -top-2 -right-2 bg-mustard text-chocolate rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavigationComponent {
}

