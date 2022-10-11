import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Bookshelf = ({books}) => {
    return (
            <div className="shelf-div">
                {books.map(book => 
                    <div key={book.id} className="book">
                        <Link to={"/books/" + book.id}>{book.title}</Link>

                    </div>
                )}
            </div>
    )
}


export default Bookshelf;
