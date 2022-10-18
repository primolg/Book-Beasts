import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';
import HTMLFlipBook from 'react-pageflip'

const BookView = () => {
    const params = useParams();
    const books = useSelector((state) => state.book.singleBook)
    const pages = books ? filterPages(books.pages) : undefined
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0)


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

    useEffect(() => {
        dispatch(fetchBookData(params.id))
    }, []);

if(pages){
    console.log(pages)
}
return ( pages ? (
  <div className="content-container">
    <div className="carousel">
        {pages.map((page) => {
            <div key={page.page.id} className="carousel-item">
                <p className="page-content">
                {page.page.content}
                </p>
                <div className="page-number">
                    {page.pageNumber}
                </div>
            </div>
            // console.log(page.page.content, page.pageNumber)
        })}
    </div>
        <button className="prev-button">Previous Page</button>
        <button className="next-button">Next Page</button>
  </div>
  ) : (
    <div>no data</div>
  )
);}
export default BookView;