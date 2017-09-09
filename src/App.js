import React from 'react'
import {Route, Link} from 'react-router-dom'
import BookSectionComponent from './BookSectionComponet'

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchComponent from "./SearchComponent";

class BooksApp extends React.Component {
    state = {
        Books: [],
        CurrentlyReading: [],
        WantToRead: [],
        Read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(Books => {
            let wantToRead = Books.filter(book => book.shelf === 'wantToRead')
            let currentlyReading = Books.filter(book => book.shelf === 'currentlyReading')
            let read = Books.filter(book => book.shelf === 'read');
            this.setState({
                CurrentlyReading : currentlyReading
                , WantToRead : wantToRead
                , Read : read})
        })
    }

    updateBook = (Book, shelf) => {
        switch (shelf) {
            case 'wantToRead':
                this.addWantToRead(Book)
                break
            case 'currentlyReading':
                this.addCurrentlyReading(Book)
                break
            case 'read':
                this.addRead(Book)
                break
        }
    }

    addWantToRead = (Book) => {
        BooksAPI.update(Book, 'wantToRead').then(book => {
            this.setState(currentState => (
                {
                    WantToRead: currentState.WantToRead.concat( [Book] ),
                    CurrentlyReading : currentState.CurrentlyReading.filter(book => book.id !== Book.id),
                    Read : currentState.Read.filter(book => book.id !== Book.id)
                }
            ))
        })
    }

    addCurrentlyReading = (Book) => {
        BooksAPI.update(Book, 'currentlyReading').then(book => {
            this.setState(currentState => (
                {
                    CurrentlyReading: currentState.CurrentlyReading.concat( [Book] ),
                    WantToRead: currentState.WantToRead.filter(book => book.id !== Book.id),
                    Read: currentState.Read.filter(book => book.id !== Book.id)
                }

            ))
        })
    }

    addRead = (Book) => {
        BooksAPI.update(Book, 'read').then(book => {
            this.setState(currentState => (
                {
                    Read: currentState.Read.concat( [Book] ),
                    WantToRead: currentState.WantToRead.filter(book => book.id !== Book.id),
                    CurrentlyReading: currentState.CurrentlyReading.filter(book => book.id !== Book.id)
                }
            ))
        })
    }


    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookSectionComponent Title="Currently Reading" Books={this.state.CurrentlyReading}
                                                      updateBook={this.updateBook}/>
                                <BookSectionComponent Title="Want to Read" Books={this.state.WantToRead}
                                                      updateBook={this.updateBook}/>
                                <BookSectionComponent Title="Read" Books={this.state.Read}
                                                      updateBook={this.updateBook}/>
                            </div>
                        </div>

                        <div className="open-search">
                            <Link
                                to="/search">
                                Add a book
                            </Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({history}) => (
                    <SearchComponent addBook={(Book, shelf) => {
                        this.updateBook(Book, shelf)
                        history.push('/')
                    }}/>
                )}/>


            </div>
        )
    }
}

export default BooksApp
