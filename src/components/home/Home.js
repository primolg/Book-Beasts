import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/reducers/bookSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  let [ search, setSearch ] = useState('');

  
  useEffect(() => {
    dispatch(fetchBooks())
  },[search])
  
  const handleChange = event => {
    if(event.key === "Enter"){
    setSearch(event.target.value);
    const searchedBooks = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    navigate('/books',  {state: event.target.value});
    }
  }

  const featuredBooks = books.filter(book => book.isFeatured);
  
  return (
    <div className='content-container'>
      <div className='home-container'>
        <h1>Book Beasts</h1>
      </div>
      <div className='home-search-bar'>
        <input placeholder='search for book by name' type="text" onKeyDown={handleChange}/>
      </div>
      <div className='featured-book-slider'>
        <div className="outer-div">Featured Books:
              <div className="shelf-div">
                  {featuredBooks.map(book => 
                  <div key={book.id}>
                      <Link to={`/books/${book.id}`}>
                      <div className="book">
                        <img className="slider-image" src={book.coverArt}/>
                        <div>{book.title}</div>
                        <p>By: {book.student.firstName} {book.student.lastName}</p>
                      </div>
                      </Link>
                      <div>{book.totalPages} Pages</div>
                      <div className="genre-tag">{book.genre}</div>
                  </div>
                  )}
              </div>
          </div>
        </div>
    </div>
)}

export default Home;