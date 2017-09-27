import React, { Component } from 'react'
import PropType from 'prop-types'


class ShelfChangerComponent extends Component {
    static PropTypes = {
        selectOption : PropType.string.isRequired,
        updateBookStatus : PropType.func.isRequired
    }

    render(){
        const { selectOption, updateBookStatus , Book} = this.props
        return (
            <div className="book-shelf-changer">
                <select onChange={(event) => updateBookStatus(Book, event.target.value)} value={selectOption}>
                    <option value="none">Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                </select>
            </div>
        )
    }
}

export default ShelfChangerComponent