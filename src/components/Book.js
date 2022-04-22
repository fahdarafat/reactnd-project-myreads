import React from 'react';

class Book extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: this.props.book.imageLinks
                  ? `url(${this.props.book.imageLinks.thumbnail})`
                  : `url(./icons/add.svg)`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(e) =>
                  this.props.onUpdateShelf(this.props.book, e.target.value)
                }
                value={this.props.book.shelf ? this.props.book.shelf : 'none'}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </div>
    );
  }
}

export default Book;
