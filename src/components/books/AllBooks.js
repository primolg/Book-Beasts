import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../store/reducers/bookSlice";
import { Link } from "react-router-dom";

const AllBooks = () => {
    const dispatch = useDispatch();

    const [ sort, setSort ] = useState('none');
    const [ search, setSearch ] = useState('');

    
    useEffect(() => {
        dispatch(fetchBooks())
    }, [sort]);

    //note: filter works, sort works, but the two do not work together.  debug later

    const sortBooks = (bookArray, sortOption) => {
        switch(sortOption) {
          case 'mystery':
            return bookArray.filter(book => book.genre.includes('mystery'));
          case 'adventure':
            return bookArray.filter(book => book.genre.includes('adventure'));
          case 'fantasy':
            return bookArray.filter(book => book.genre.includes('fantasy'));
          case 'action':
            return bookArray.filter(book => book.genre.includes('action'));
          case 'biography':
            return bookArray.filter(book => book.genre.includes('biography'));
          case 'none':
            return bookArray.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
        }
      }

      const books = sortBooks(useSelector(state => state.book.books || []), sort);

      const handleOptions = event => {
        setSort(event.target.value);
      }
  
      const handleChange = event => {
        setSearch(event.target.value)
      }

    return (
        <>
        <div id='filter-wrap'>
            <label htmlFor='filter-options' className='filter-label'>View Books: </label>
            <select name='filter-options' className='filter-options' onChange={handleOptions} defaultValue='none'>
                    <option value='mystery'>View Mystery Books</option>
                    <option value='adventure'>View Adventure Books</option>
                    <option value='fantasy'>View Fantasy Books</option>
                    <option value='biography'>View Biographical Books</option>
                    <option value='action'>View Action Books</option>
                    <option value='none'>View All</option>
                  </select>
                  <input placeholder='search for book by name' value={search} onChange={handleChange}/>
                  </div>
            <div className='book-div'> {/* What is this div?  Check later */}
          <div className='wrapper'>
          <div className='featured-book-slider'>
        <div className="outer-div">Books:
              <div className="shelf-div">
                  {books.map(book => 
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
          </div>
        
        </>
       )
}

export default AllBooks;