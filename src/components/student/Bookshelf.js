import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Bookshelf = ({books, themes}) => {

    return !themes ? (
            <div className="shelf-div-student">
                {books.map(book => 
                    <div key={book.id} className="book-in-shelf-student">
                        <Link to={"/books/" + (book.title === "empty slot" ? "sci-fi" : book.id)}>{book.title}</Link>
                    </div>
                )}
            </div>
    ) : (
        <div className="shelf-div-student">
            {themes.map(theme => 
                <div key={theme} className="book-in-shelf-student">
                    <Link to={"/books/" + theme}>{theme}</Link>
                </div>
            )}
        </div>
    )
}


export default Bookshelf;
