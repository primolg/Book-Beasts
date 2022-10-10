import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/reducers/bookSlice';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state);

  
  useEffect(() => {
    dispatch(fetchBooks())
  },[])
  
  console.log(books.book);

  
  return (
    <div className='content-container'>
      <div className='FILLER-NAV-BAR'>NAV BAR</div>
      <div className='home-container'>
        <h1>Book Beasts</h1>
      </div>
      <div className="outer-div">
            <div className="shelf-div">
                {books.book.books.map(book => 
                <div>
                    <div className="book">{book.title}</div>
                    <div>{book.coverArt}</div>
                    <div>{book.isPublished}</div>
                    <div>{book.totalPages}</div>
                    <div>{book.genre}</div>
                </div>
                )}
            </div>
        </div>

    </div>
)}

export default Home;