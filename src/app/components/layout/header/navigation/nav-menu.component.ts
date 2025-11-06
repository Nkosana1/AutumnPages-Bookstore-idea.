import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
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
      <a routerLink="/about" 
         routerLinkActive="text-mustard"
         class="text-vanilla hover:text-mustard transition-colors font-sans text-lg">
        About
      </a>
      <a routerLink="/contact" 
         routerLinkActive="text-mustard"
         class="text-vanilla hover:text-mustard transition-colors font-sans text-lg">
        Contact
      </a>
    </div>
  `,
  styles: []
})
export class NavMenuComponent {
}

