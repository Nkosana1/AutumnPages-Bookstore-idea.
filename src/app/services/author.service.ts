import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authors: Author[] = [
    {
      id: 1,
      name: 'Sarah Maple',
      bio: 'Award-winning author known for heartwarming stories set in small towns. Her works capture the essence of community and the changing seasons.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      books: [1],
      followers: 12450,
      website: 'https://sarahmaple.com',
      socialMedia: {
        twitter: '@sarahmaple',
        instagram: '@sarahmaple_author'
      }
    },
    {
      id: 2,
      name: 'James Oakwood',
      bio: 'Mystery writer extraordinaire with a passion for atmospheric settings and complex characters. His novels have been translated into 15 languages.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      books: [2],
      followers: 8920,
      website: 'https://jamessoakwood.com'
    }
  ];

  getAuthorById(id: number): Observable<Author | undefined> {
    const author = this.authors.find(a => a.id === id);
    return of(author);
  }

  getFeaturedAuthor(): Observable<Author> {
    return of(this.authors[0]);
  }

  getAllAuthors(): Observable<Author[]> {
    return of(this.authors);
  }
}

