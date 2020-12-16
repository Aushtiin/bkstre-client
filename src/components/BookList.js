import React from 'react'
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/Query';
import BookDetail from './BookDetail';


const BookList = ({ selected, setSelected }) => {
  const { loading, error, data } = useQuery(getBooksQuery)
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Whoops! Something went wrong</p>

  return (
    <div>
      {data.books.map((book) => (
        <ul className="book-list" key={book.id} >
          <li
            
            onClick={(e) => {setSelected(book.id)}}
          >
            {book.name}
          </li>
        </ul>
      ))}
      <BookDetail bookId={selected} />
    </div>
  )
}

export default BookList
