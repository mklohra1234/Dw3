# code smells

- `book-search.component.html` => We should replace formatDate function call with native date           pipe.         `resolved`
- `book-search.component.html` => Responsive design is not handled for list of books.
- `book-search.component.ts` => Memory leak: Unsubscribe missing for subscription done on getAllBooks. Using async pipe Instead of subscribe will allow to access to data in the template without creating extra property. when component destroy it unsubscribes. `resolved`
- `reading-list.reducer.spec.ts` => Test cases are failing `resolved`
-  `books.reducer.ts` => Unused store property: "searchTerm" is updated from the reducer but is not    referred anywhere in component/selector.`resolved`
- `reading-list.reducer.ts` => failedAddToReadingList & failedRemoveFromReadingList actions are not caught in the reducer. We need to handle failure of add/remove book API calls so we can revert the state for added/removed book else it will result in inaccurate data being displayed to the user.`resolved`
-  `book-search.component.html, reading-list.component.html` => BEM naming convention to be followed.

# improvements

- There is no spinner while fetching books, in loading it tooks time.
- Pagination should be implemented in case of large data
- Provide informational message to the user, if books are not found for the specific search term.
-  `books.effects.ts, reading-list.effects.ts` => Constant is not used for API endpoints.`resolved`
-  `book-search.component.html` => Instead of interpolating coverUrl `<img src="{{ b.coverUrl }}" />`, we can use property binding on src attribute `<img [src]="b.coverUrl" />`.`resolved`
- `book-search.component.html, reading-list.component.html` =>  BEM naming convention to be followed.

# Accessibilities issues:

All resolved

## Lighthouse

- Buttons do not have an accessible name.(aria-label tag to be included)
- Background and foreground colors do not have a sufficient contrast ratio.

## Manual scan issues

- `book-search.component.html, reading-list.component.html` => We should provide "alt" attribute for "img" elements and keep it's value empty("") so screenreaders can completely ignore it.
- `book-search.component.html` => We need to set aria-label attribute for "Want to Read" button with book's name in it's value, this can help screenreader to inform user which book's Want to Read button is focused.
- `app.component.html` => Close reading list button is only icon button, so we should add aria-label attribute to the button so it will help screenreaders to inform user. Also close button keyboard focus propert needs attention.
- `reading-list.component.html` => Empty reading list text should have better visiblity.
- `book-search.component.html` => Example "JavaScript" link should be a button instead of anchor tag.anchor tag used for redirection.
- `book-search.component.html` => Search button is icon only button, so we should add aria-label attribute to the button so it will help screenreaders to inform user.focus property needs attention.