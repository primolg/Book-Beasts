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
    console.log(book)
}

export default SingleBook;