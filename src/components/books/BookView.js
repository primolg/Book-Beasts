import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';

const BookView = () => {
    const params = useParams();
    const books = useSelector((state) => state.book.singleBook)
    const dispatch = useDispatch();

        
    useEffect(() => {
        dispatch(fetchBookData(params.id))
    }, []);
    return (
            <div>
                {books ? books.pages.map(page =>
                <div key={page.id}>
                    <h3>page number:{page.id}</h3>
                    <p>{page.content}</p>
                </div>
                ): <p>no book data</p>}
            </div>
    )
}


export default BookView;