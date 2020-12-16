import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/Query';


const AddBook = ({ setText, bookName, authorId, genre }) => {
    const textHandler = (e) => {
        const { name, value } = e.target
        setText({ [name]: value })
    };

    const [addBook] = useMutation(addBookMutation,);


    const SubmitForm = (e) => {
        e.preventDefault();
        addBook({
            variables:
            {
                name:  bookName ,
                genre:  genre ,
                authorId:  authorId 
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    const { loading, error, data } = useQuery(getAuthorsQuery)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Whoops! Something went wrong</p>

    return (
        <form action="add-book" onSubmit={SubmitForm} >
            <div className="field">
                <label htmlFor="">Book Name:</label>
                <input type="text" name="bookName" id="" onChange={textHandler} />
            </div>

            <div className="field">
                <label htmlFor="">Genre:</label>
                <input type="text" name="genre" id="" onChange={textHandler} />
            </div>

            <div className="field">
                <label htmlFor="">Author:</label>
                <select name="authorId" id="" onChange={textHandler} >
                    <option value="">Select Author</option>
                    {data.authors.map((author) => (
                        <option key={author.id} value={author.id} >{author.name}</option>
                    ))}
                </select>
            </div>

            <button>+</button>
        </form>
    )
}

export default AddBook
