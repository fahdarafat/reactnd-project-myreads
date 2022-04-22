import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Route, Link } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  shelfFilter(book) {
    if (this === book.shelf) {
      return true;
    }
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books,
        }));
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    shelfName={'currentlyReading'}
                    title={'Currently Reading'}
                    books={this.state.books}
                    onUpdateShelf={this.updateShelf}
                  />
                  <BookShelf
                    title={'Want To Read'}
                    shelfName={'wantToRead'}
                    books={this.state.books}
                    onUpdateShelf={this.updateShelf}
                  />
                  <BookShelf
                    title={'Read'}
                    shelfName={'read'}
                    books={this.state.books}
                    onUpdateShelf={this.updateShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search onUpdateShelf={this.updateShelf} books={this.state.books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
