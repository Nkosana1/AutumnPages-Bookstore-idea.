import { Injectable } from '@angular/core';
import { Book } from '../models/book.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: "The Autumn Chronicles",
      author: "Sarah Maple",
      price: 24.99,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      description: "A heartwarming tale set in a small New England town during the fall season.",
      category: "Fiction",
      rating: 4.8,
      publishedYear: 2023
    },
    {
      id: 2,
      title: "Harvest Moon",
      author: "James Oakwood",
      price: 19.99,
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      description: "A mystery novel that unfolds during the harvest festival in a quaint village.",
      category: "Mystery",
      rating: 4.6,
      publishedYear: 2022
    },
    {
      id: 3,
      title: "Warmth of Words",
      author: "Emma Crimson",
      price: 22.99,
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      description: "A collection of poetry celebrating the beauty of autumn and cozy moments.",
      category: "Poetry",
      rating: 4.9,
      publishedYear: 2023
    },
    {
      id: 4,
      title: "The Rustic Library",
      author: "Michael Brown",
      price: 28.99,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      description: "A historical fiction about a family-run bookstore spanning three generations.",
      category: "Historical Fiction",
      rating: 4.7,
      publishedYear: 2022
    },
    {
      id: 5,
      title: "Cozy Reading Nights",
      author: "Isabella Gold",
      price: 21.99,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "A guide to creating the perfect reading atmosphere and discovering your next favorite book.",
      category: "Non-Fiction",
      rating: 4.5,
      publishedYear: 2023
    },
    {
      id: 6,
      title: "Autumn Leaves",
      author: "Robert Amber",
      price: 26.99,
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      description: "An epic fantasy adventure where the changing seasons hold magical powers.",
      category: "Fantasy",
      rating: 4.8,
      publishedYear: 2023
    },
    {
      id: 7,
      title: "The Parchment Scroll",
      author: "Victoria Sage",
      price: 23.99,
      coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
      description: "A romance novel set in a charming bookstore where love stories unfold.",
      category: "Romance",
      rating: 4.6,
      publishedYear: 2022
    },
    {
      id: 8,
      title: "Golden Hour Stories",
      author: "David Mustard",
      price: 20.99,
      coverImage: "https://images.unsplash.com/photo-1536678899566-8b1d0a3b0c5d?w=400",
      description: "Short stories that capture the essence of autumn evenings and warm conversations.",
      category: "Short Stories",
      rating: 4.7,
      publishedYear: 2023
    }
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBookById(id: number): Observable<Book | undefined> {
    const book = this.books.find(b => b.id === id);
    return of(book);
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    const filtered = this.books.filter(b => b.category === category);
    return of(filtered);
  }
}

