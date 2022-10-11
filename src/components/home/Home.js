import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/reducers/bookSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const [ search, setSearch ] = useState('');

  
  useEffect(() => {
    dispatch(fetchBooks())
  },[])
  
  const handleChange = event => {
    if(event.key === "Enter"){
    setSearch(event.target.value)
    }
  }

  const featuredBooks = books.filter(book => book.isFeatured);
  
  return (
    <div className='content-container'>
      <div className='home-container'>
        <h1>Book Beasts</h1>
      </div>
      <div className='home-search-bar'>
        <form>
        <input placeholder='search for book by name' type="text" onKeyDown={handleChange}/>
        </form>
      </div>
      <div className='featured-book-slider'>
        <div className="outer-div">Featured Books:
              <div className="shelf-div">
                  {featuredBooks.map(book => 
                  <div>
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