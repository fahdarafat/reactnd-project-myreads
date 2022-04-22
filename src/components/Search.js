import React from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import Book from './Book';

class Search extends React.Component {
  state = {
    searchedBooks: [],
    error: false,
  };
  handleChange = (e) => {
    if (e.target.value.length > 0) {
      search(e.target.value).then((books) => {
        if (books.length > 0) {
          this.setState(() => ({
            error: false,
            searchedBooks: books,
          }));
        } else {
          // When user enters an invalid query
          this.setState((prevState) => ({
            error: true,
          }));
        }
      });
    } else {
      // Reset State when search field is cleared
      this.setState(() => ({
        searchedBooks: [],
      }));
    }
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!this.state.error ? (
            <div className="books-grid">
              {this.state.searchedBooks.map((book) => (
                <Book
                  book={book}
                  key={book.id}
                  onUpdateShelf={this.props.onUpdateShelf}
                />
              ))}
            </div>
          ) : (
            <div>There is no result for your search </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
