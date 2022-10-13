import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';
import FlipPage from 'react-flip-page'

const BookView = () => {
    const params = useParams();
    const books = useSelector((state) => state.book.singleBook)
    const pages = books ? filterPages(books.pages) : undefined
    const dispatch = useDispatch();

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
console.log(pages)
    useEffect(() => {
        dispatch(fetchBookData(params.id))
    }, []);

return ( pages ? (
        <div className="flipbook">
          <FlipPage
            className="book"
            showSwipeHint
            uncutPages
            orientation="horizontal"
            width="800px"
            pageBackground="#fffdf8"
            animationDuration="400"
          >
            {console.log(pages)}
            {pages.map(page => (
                <article style={{ width: "800px", height: "1000px", padding: "10px 20px" }}>
                    <div className="page-wrapper">
                        <img className="page-image" src={page.page.image}/>
                        <p>{page.page.content}</p>
                        <p>{page.pageNumber}</p>
                    </div>  
              </article>
            ))}
          </FlipPage>
        </div>
  ) : (
    <div>no data</div>
  )
);}

export default BookView;