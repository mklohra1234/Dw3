import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books$ = this.store.select(getAllBooks);
  subscription = new Subscription();
  searchForm = this.fb.group({
    term: '',
  });
  private ngUnsubscribe: Subject<void>;


  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
  ) {
    this.ngUnsubscribe = new Subject<void>()

  }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe.asObservable()),
        debounceTime(500),
        distinctUntilChanged((prev, next) => prev.term === next.term)
      )
      .subscribe(() => this.searchBooks());
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
