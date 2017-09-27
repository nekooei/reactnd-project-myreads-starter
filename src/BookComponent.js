/**
 * Created by milad on 9/3/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChangerComponent from './ShelfChangerComponent'


class BookComponent extends Component{


    static propTypes = {
        Book: PropTypes.object.isRequired,
        updateBookStatus : PropTypes.func.isRequired,
        getShelf : PropTypes.func
    }

    render (){
        const { Book , updateBookStatus , getShelf} = this.props

        let shelf = Book.shelf
        if(getShelf !== undefined){
            shelf = getShelf(Book)
        }

        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url(${Book.imageLinks.thumbnail})`}}/>
                    <ShelfChangerComponent Book={Book} updateBookStatus={updateBookStatus} selectOption={shelf}/>
                </div>
                <div className="book-title">{Book.title}</div>
                {Book.authors !== undefined ? (
                    Book.authors.map(author => (
                        <div key={author} className="book-authors">{author}</div>
                    ))
                    ) : (<div className="book-authors"> </div> )}
                {/**/}
            </div>
        )
    }
}

export default BookComponent
