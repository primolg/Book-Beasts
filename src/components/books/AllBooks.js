import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../store/reducers/bookSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AllBooks = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [ sort, setSort ] = useState('none');
    const [ search, setSearch ] = useState('');

    
    useEffect(() => {
        dispatch(fetchBooks())
        if(location.state){
            setSearch(location.state)
        }
    }, [sort]);

    const sortBooks = (bookArray, sortOption) => {
        switch(sortOption) {
          case 'mystery':
            return bookArray.filter(book => book.genre.includes('mystery') && book.title.toLowerCase().includes(search.toLowerCase()));
          case 'adventure':
            return bookArray.filter(book => book.genre.includes('adventure') && book.title.toLowerCase().includes(search.toLowerCase()));
          case 'fantasy':
            return bookArray.filter(book => book.genre.includes('fantasy') && book.title.toLowerCase().includes(search.toLowerCase()));
          case 'action':
            return bookArray.filter(book => book.genre.includes('action') && book.title.toLowerCase().includes(search.toLowerCase()));
          case 'biography':
            return bookArray.filter(book => book.genre.includes('biography') && book.title.toLowerCase().includes(search.toLowerCase()));
          case 'none':
            return bookArray.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
        }
      }

      const books = sortBooks(useSelector(state => state.book.books || []), sort);

      const handleOptions = event => {
        setSort(event.target.value);
        console.log(sort);

        sortBooks(books, '');
      }

      const handleClick = () => {
        setSearch('')
        sortBooks(books, 'none')
        navigate('/books',  {state: ''});
        window.location.reload();
      }
console.log(books)
    return ( books ? (
        <>
        <div id='filter-wrap'>
            <label htmlFor='filter-options' className='filter-label'>Select genre: </label>
            <select name='filter-options' className='filter-options' onChange={handleOptions} defaultValue='none'>
                    <option value='mystery'>View Mystery Books</option>
                    <option value='adventure'>View Adventure Books</option>
                    <option value='fantasy'>View Fantasy Books</option>
                    <option value='biography'>View Biographical Books</option>
                    <option value='action'>View Action Books</option>
                    <option value='none'>View All</option>
                  </select>
                  <button className="show-all-button" onClick={handleClick}>Show All</button>
                  </div>
          <div className='wrapper'>
          <div className='all-book-view'>
                      {books.filter(book => book.isPublished).map(book => 
                      (<div className="book-container" key={book.id}>
                          <Link to={`/books/${book.id}`}>
                          <div className="book">
                            <div className="image-wrapper">
                              <img className="slider-image" src={book.coverArt}/>
                            </div>
                            <div className="title-box">
                              <div className="book-title">{book.title}</div>
                            </div>
                          </div>
                          </Link>
                          <div className="author-tag">  
                            <p className="author-info">By: {book.student.firstName} {book.student.lastName}</p>
                            <div className="page-numbers author-info">{book.totalPages} Pages</div>
                            <div className="genre-tag author-info">{book.genre}</div>
                          </div>
                      </div>)
                      )}
            </div>
          </div>
        
        </>) : <div>no data</div>
       )
}

export default AllBooks;