import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/reducers/bookSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);

  
  useEffect(() => {
    dispatch(fetchBooks())
  },[])
  
  console.log(books);
  const featuredBooks = books.filter(book => book.isFeatured);
  
  return (
    <div className='content-container'>
      <div className='home-container'>
        <h1>Book Beasts</h1>
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