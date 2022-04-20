import React from 'react';
import Book from './Book';

function BookShelf(props) {
  const shelfFilter = function(book) {
    if (this === book.shelf) {
      return true;
    }
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="books-grid">
        {props.books.filter(shelfFilter, props.shelfName).map((book) => (
          <Book book={book} key={book.id} onUpdateShelf={props.onUpdateShelf} />
        ))}
      </div>
    </div>
  );
}

export default BookShelf;
