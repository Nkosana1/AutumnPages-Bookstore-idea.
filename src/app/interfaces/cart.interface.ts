import { Book } from '../models/book.interface';

export interface CartItem {
  id: number;
  book: Book;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
}

