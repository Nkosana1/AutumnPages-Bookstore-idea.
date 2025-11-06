import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BookService } from './book.service';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private bookService: BookService) {}

  search(query: string): Observable<Book[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    return this.bookService.getBooks().pipe(
      map(books => 
        books.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase())
        )
      ),
      delay(300) // Simulate API delay
    );
  }

  getAutocompleteSuggestions(query: string): Observable<string[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    return this.bookService.getBooks().pipe(
      map(books => {
        const suggestions: string[] = [];
        const lowerQuery = query.toLowerCase();

        books.forEach(book => {
          if (book.title.toLowerCase().includes(lowerQuery)) {
            suggestions.push(book.title);
          }
          if (book.author.toLowerCase().includes(lowerQuery)) {
            suggestions.push(book.author);
          }
        });

        return [...new Set(suggestions)].slice(0, 5);
      })
    );
  }
}

