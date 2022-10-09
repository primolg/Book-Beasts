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
        <p>What kind of beast will you be today...?</p>
      </div>
      <div className="outer-div">
            <div className="shelf-div">
                {books.book.books.map(book => 
                    <div className="book">{book.title}</div>
                )}
            </div>
        </div>

    </div>
)}

export default Home;