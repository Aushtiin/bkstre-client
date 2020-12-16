import React, { useReducer, useState } from 'react';
import './index.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:3030/graphql",
  cache: new InMemoryCache()
});



const App = () => {
  const [text, setText] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    bookName: '',
    genre: '',
    authorId: '',
    },
  );
  const [ selected, setSelected] = useState(null)
  


  return (
    <ApolloProvider client={client}>
      <div className="main">
        <header className="App-header">
          <h1>Reading List</h1>
        </header>
        <BookList selected={selected} setSelected={setSelected} />
        <AddBook setText={setText} bookName={text.bookName} genre={text.genre} authorId={text.authorId} />
      </div>
    </ApolloProvider>
  );
}

export default App;
