# Are there any problems or code smells in the app?

- __Resolved__: `book-search.component.html` => We should replace format date function as native date pipe because format date function is called when change detection cycle is triggered where as native date pipe is triggered when input data is modified.
- `book-search.component.html` => Responsive design is not handled for list of books.
- __Resolved__: `book-search.component.ts` => Memory leak: Unsubscribe missing for subscription done on getAllBooks. Using async pipe Instead of subscribe will allow to access to data in the template without creating extra property. Angular automatically unsubscribes from the observable on component destroy. This prevents the problem of orphan subscriptions and memory leak, also we don't need to hold the subscription with extra property in the component.When we use async pipe here ,unsubscription done when component destroy.
- __Resolved__: `reading-list.reducer.spec.ts` => Test cases are failing
- __Resolved__: `books.reducer.ts` => Unused store property: "searchTerm" is updated from the reducer but is not referred anywhere in component/selector.
- __Resolved__: `reading-list.reducer.ts` => failedAddToReadingList & failedRemoveFromReadingList actions are not caught in the reducer. We need to handle failure of add/remove book API calls so we can revert the state for added/removed book else it will result in inaccurate data being displayed to the user.
- __Resolved__: `book-search.component.html, reading-list.component.html` => Better naming required for loop variables in the HTML templates. Proper naming of the variables provides more readability to the code.

# Are there other improvements you would make to the app? What are they and why?

- There is no spinner while fetching books, it is good to show spinner while fetching books as network constraint might be there.
- The pagination is not implemented so only 10 books are fetched currently matching the search criteria, adding pagination would allow user to move through pages of book items and see more than 10 books. As an option to pagination we can also add infinite loading feature where user can scroll as per need to see more books.
- Provide informational message to the user, if books are not found for the specific search term.
- __Resolved__: `books.effects.ts, reading-list.effects.ts` => Constant is not used for API endpoints.
- __Resolved__: `book-search.component.html` => Rather than  interpolating coverUrl `<img src="{{ b.coverUrl }}" />`, we can use property binding on src attribute `<img [src]="b.coverUrl" />`. It seems better technically better.
- `book-search.component.html, reading-list.component.html` => The css class naming is not following standard, for e.g. book--title, book--content etc. If we are following BEM(Block-Element-Modifier) naming convention then ideally book--title should be book__title as title is a div element inside book block.
- `book-search.component.html, reading-list.component.html` => Footer can be implemented for more good cosmetic view.
# Accessibilities issues:

_All issues resolved_

## Lighthouse

- Buttons do not have an accessible name.
- Background and foreground colors do not have a sufficient contrast ratio.

## Issues found in Manual scan

- `book-search.component.html, reading-list.component.html` => We should provide "alt" attribute for "img" elements and keep it's value empty("") so screenreaders can completely ignore it, as in our case book image is only decorative image and does not provide any valuable information to the user.
- `book-search.component.html` => We need to set aria-label attribute for "Want to Read" button with book's name in it's value, this can help screenreader to inform user which book's Want to Read button is focused. Also "Want to Read" button keyboard focus should have better visiblity.
- `app.component.html` => Close reading list button is only icon button, so we should add aria-label attribute to the button so it will help screenreaders to inform user. Also close button keyboard focus should have better visiblity.
- `reading-list.component.html` => Empty reading list text should have better visiblity.
- `book-search.component.html` => Example "JavaScript" link should be a button instead of anchor tag as we are not using href attribute or redirecting to any other page. We are only handling click to action to search books.
- `book-search.component.html` => Search button is icon only button, so we should add aria-label attribute to the button so it will help screenreaders to inform user. Also need to increase search icon font size to provide better visibility and click area.
