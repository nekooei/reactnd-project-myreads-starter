/**
 * Created by milad on 9/3/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookComponent extends Component{


    static propTypes = {
        Book: PropTypes.object.isRequired,
        updateBookStatus : PropTypes.func.isRequired
    }

    render (){
        const { Book , updateBookStatus} = this.props
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${Book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => updateBookStatus(Book, event.target.value)}>
                            <option value="none">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{Book.title}</div>
                {Book.authors !== undefined ? (
                    Book.authors.map(author => (
                        <div className="book-authors">{author}</div>
                    ))
                    ) : (<div className="book-authors"> </div> )}
                {/**/}
            </div>
        )
    }
}

export default BookComponent
