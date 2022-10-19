import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Bookshelf = ({books, themes}) => {
    const bookArray = []

    if (books?.length){
        for (let i = 0; i < books.length; i++){
            if (books[i].isPublished){
                bookArray.push(books[i])
            } else {
                bookArray.unshift(books[i])
            }
        }
    }
    
    return !themes ? (
            <div className="shelf-div-student">
                {bookArray.map(book => 
                    <div key={book.id} className="book-in-shelf-student">
                        <Link to={"/books/" + (book.title === "empty slot" ? "sci-fi" : book.id)}>{book.title}</Link>
                        <p>{book.isPublished ? "" : "(in progress)"}</p>
                    </div>
                )}
            </div>
    ) : (
        <div className="shelf-div-student">
            {themes.map(theme => 
                <div key={theme} className={"book-in-shelf-student "+ theme} >
                    <Link to={"/books/" + theme} id="link">{theme}</Link>
                </div>
            )}
        </div>
    )
}


export default Bookshelf;
