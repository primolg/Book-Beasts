import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';
import HTMLFlipBook from 'react-pageflip'
import BookView1 from './BookView1';
import BookView2 from './BookView2';
import BookView3 from './BookView3';
import BookView4 from './BookView4';
import disableScroll from 'disable-scroll';

const BookView = () => {
    const params = useParams();
    const books = useSelector((state) => state.book.singleBook)
    const pages = books ? filterPages(books.pages) : undefined
    const dispatch = useDispatch();


    // show the photo with this index
    const [currentIndex, setCurrentIndex] = useState(0);

    // move to the next photo
    // if we are at the end, go to the first photo
    const next = () => {
        setCurrentIndex((currentIndex + 1) % pages.length);
    };

    // move to the previous photo
    // if we are at the beginning, go to the last photo
    const prev = () => {
        setCurrentIndex((currentIndex - 1 + pages.length) % pages.length);
    };


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
    const asyncFetchBookData = async () =>{
        const fetchBooks = await dispatch(fetchBookData(params.id))
    }
    asyncFetchBookData();
    }, []);
    
    
    if(pages && pages.length % 2 !== 0){ 
        const blankPage = {
            page: {
                content: '',
            }
        }
        pages.push(blankPage);
    }
    
return ( pages ? (
  <div className="content-container">
        <HTMLFlipBook width={300} height={500}>
        {pages.map((page) => {
        switch(page.page.templateId){
            case 1:
                return (
            <div className="demoPage">
                <BookView1 key={page.page.id} page={page}/>
            </div>)
            case 2:
                return (
            <div className="demoPage">
                <BookView2 key={page.page.id} page={page}/>
            </div>)
            case 3:
                return (
            <div className="demoPage">
                <BookView3 key={page.page.id} page={page}/>
            </div>
                )
            case 4:
                return (
            <div className="demoPage">
                <BookView4 key={page.page.id} page={page}/>
            </div>
                )
            default:
                return (
            <div className="demoPage">
                <BookView3 key={page.page.id} page={page}/>
            </div>)
        }
        
        <div className="demoPage">
            <BookView3 key={page.page.id} page={page}/>
        </div>
            }
        )}
        </HTMLFlipBook>
    </div>
  ) : (
    <div>no data</div>
  )
);}
export default BookView;