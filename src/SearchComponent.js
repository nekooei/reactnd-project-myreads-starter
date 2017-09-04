/**
 * Created by milad on 9/4/17.
 */
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import BookSectionComponent from "./BookSectionComponet";
import BookComponent from "./BookComponent";

class SearchComponent extends Component{

    state ={
        query : '',
        searchResult : []
    }

    updateQuery = (query) => {
        this.fetchSearch(query)
    }

    fetchSearch = (query) => {
        if(query.length !== 0){
            BooksAPI.search(query, 10).then(Books => {
                this.setState({ query: query, searchResult: Books})
            });
        }
    }

    render(){
        const {query , searchResult} = this.state
        console.log(searchResult)
        let mustShow = searchResult
        mustShow.sort(sortBy('title'))
        return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author"
                                    onChange={(event) => this.updateQuery(event.target.value)}/>

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {mustShow.map(book => (
                                <li key={book.id}>
                                    <BookComponent Book={book}/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )

    }
}

export default SearchComponent
