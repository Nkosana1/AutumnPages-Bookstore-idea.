import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'books',
    loadComponent: () => import('./pages/books/books.component').then(m => m.BooksComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./pages/book-detail/book-detail-page.component').then(m => m.BookDetailPageComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  }
];
