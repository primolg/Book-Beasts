import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookData } from "../../store/reducers/bookSlice";

const SingleBook = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchBookData(id));
    },[]);

    const book = useSelector((state) => state.book.singleBook)
    
const sortPages = (book) => {

        let orderedPages = [];
        let currentPage = book.pages.filter((page) => page.isFirstPage);
        orderedPages.push(currentPage);
        
        while(orderedPages.length < book.pages.length){
            let nextPage = book.pages.filter((page) => page.id == currentPage[0].nextPage);
            orderedPages.push(nextPage);
            currentPage = nextPage;
        }

        //all pages are put into an array, in the linked list order
        //this is done to make rendering easier.
        console.log(orderedPages);
    }

    if(book){
        sortPages(book);
    }
}

export default SingleBook;