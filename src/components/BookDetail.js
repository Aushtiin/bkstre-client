import React from 'react';
import { getBookQuery } from '../queries/Query'
import { useQuery } from '@apollo/client'

const BookDetail = ({ bookId }) => {
    const { loading, error, data } = useQuery(getBookQuery, { variables: { id: bookId } })
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Whoops! Something went wrong</p>

    const displayDetails = () => {
        const { book } = data
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>ALL BOOKS BY THIS AUTHOR: </p>
                    <ul className="other-books">
                        {book.author.books.map((book) => {
                            return <li key={book.id}>
                                {book.name}
                            </li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return <p>No book Selected...</p>
        }
    }

    return (
        <div className="book-detail">
            {displayDetails()}
        </div>
    )
}

export default BookDetail
