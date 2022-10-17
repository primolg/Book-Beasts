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


      const Page = React.forwardRef((props, ref) => {
        return (
            <div className="demoPage" ref={ref}>
                /* ref required */
                <h1>Page Header</h1>
                <p>{props.children}</p>
                <p>Page number: {props.number}</p>
            </div>
        );
    });

return ( pages ? (
  <div className="content-container">
    <HTMLFlipBook width={300} height={500}>
            <Page number="1">Page text</Page>
            <Page number="2">Page text</Page>
            <Page number="3">Page text</Page>
            <Page number="4">Page text</Page>
        </HTMLFlipBook>
  </div>
  ) : (
    <div>no data</div>
  )
);}
export default BookView;