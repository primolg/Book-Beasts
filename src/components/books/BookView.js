import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';

const BookView = () => {
    const params = useParams();
    const books = useSelector((state) => state.book.singleBook)
    const pages = books ? filterPages(books.pages) : undefined
    const dispatch = useDispatch();


    //function to sort through pages linked list + add page number to each obj
    function filterPages(pages){
        let orderedPages = [];
        let currentPage = pages.filter((page) => page.isFirstPage);
        orderedPages.push({pageNumber: 1, page : currentPage[0]});

        let counter = 0;
        while(orderedPages.length < pages.length){
            let nextPage = pages.filter((page) => page.id == orderedPages[counter].page.nextPage);
            orderedPages.push({pageNumber: (counter + 2), page : nextPage[0]});
            counter++;
        }
        return orderedPages;
    }
    // console.log(pages)
    useEffect(() => {
        dispatch(fetchBookData(params.id))
    }, []);

    return pages ? (
            <div>
                {pages.map(page =>
                <div key={page.page.id}>
                    <h3>{page.pageNumber}</h3>
                </div>
                )}
            </div>
    ) : (
        <div>
            no book data
        </div>
    )
}


export default BookView;