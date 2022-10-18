import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [ search, setSearch ] = useState('');
    const books = useSelector((state) => state.book.books);
    // console.log(books)


    useEffect(() => {
        if(location.state){
            setSearch(location.state)
        }
    }, []);

    const handleChange = event => {
        if(event.key === "Enter"){
            setSearch(event.target.value)
            const searchedBooks = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
            navigate('/books',  {state: event.target.value});
        }
      }

    return(
        <>
            <input placeholder='search for book by name' type="text" onKeyDown={handleChange}/>
        </>
    )
}

export default SearchBar;
