/**
 * Created by milad on 9/4/17.
 */

import React, { Component } from 'react'
import BookComponent from './BookComponent'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class BookSectionComponent extends Component{
    static propTypes = {
        Title : PropTypes.string.isRequired,
        Books : PropTypes.array.isRequired,
        updateBook : PropTypes.func.isRequired
    }



    render(){
        const { Title ,Books , updateBook} = this.props
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{Title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Books.map(Book => (
                            <li key={Book.id}>
                                <BookComponent Book={Book} updateBookStatus={updateBook} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}


export default BookSectionComponent