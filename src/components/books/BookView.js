import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';

const BookView = () => {
    const params = useParams();
    const books = useSelector((state) => state.book.singleBook)
    const pages = books ? filterPages(books.pages) : undefined
    const dispatch = useDispatch();
    //
    const [currentPage, setCurrentPage] = useState(0)

    console.log(pages)

    //function to sort through pages linked list + add page number to each obj
    function filterPages(pages){
        console.log(pages)
        let orderedPages = [];
        let currentPage = pages.filter((page) => page.isFirstPage);
        orderedPages.push({pageNumber: 1, page : currentPage[0]});

        let counter = 0;
        while(orderedPages.length < pages.length){
            console.log(counter)
            let nextPage = pages.filter((page) => page.id == orderedPages[counter].page.nextPage);
            orderedPages.push({pageNumber: (counter + 2), page : nextPage[0]});
            counter++;
        }
        return orderedPages;
    }
    useEffect(() => {
        dispatch(fetchBookData(params.id))
    }, []);

    return pages ? (
            <div className="outer-div-book-view">
                <div className="page-selector-shelf">
                    {pages.map(page =>
                        <div className="page-selector" id={currentPage === page.pageNumber - 1 ? "selected" : ""} key={page.page.id} onClick={()=>setCurrentPage(page.pageNumber - 1)}>{page.pageNumber}</div>
                    )}
                </div>
                <div className="page">
                    <p id="page-content">{pages[currentPage].page.content}</p>
                    <p id="page-number-on-page">page {pages[currentPage].pageNumber}</p>
                </div>
            </div>
    ) : (
        <div>
            no book data
        </div>
    )
}


export default BookView;