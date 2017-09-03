/**
 * Created by milad on 9/3/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class BookComponent extends Component{
    static propTypes = {
        Book: PropTypes.object.isRequired
    }

    render (){
        const { Book } = this.props
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${Book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{Book.title}</div>
                {Book.authors.map(author => (
                    <div className="book-authors">{author}</div>
                ))}
            </div>
        )
    }
}

export default BookComponent