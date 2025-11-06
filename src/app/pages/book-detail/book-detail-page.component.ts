import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';
import { BookDetailComponent } from '../../components/books/book-detail/book-detail.component';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail-page',
  standalone: true,
  imports: [CommonModule, BookDetailComponent, LoadingSpinnerComponent],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <app-book-detail *ngIf="book$ | async as book" [book]="book"></app-book-detail>
      <app-loading-spinner *ngIf="!(book$ | async)"></app-loading-spinner>
    </div>
  `,
  styles: []
})
export class BookDetailPageComponent implements OnInit {
  book$!: Observable<Book | undefined>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.book$ = this.route.params.pipe(
      switchMap(params => this.bookService.getBookById(params['id']))
    );
  }
}

