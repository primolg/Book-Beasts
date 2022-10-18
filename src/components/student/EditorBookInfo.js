import React, { useEffect } from "react";
import { SaveProgressButton } from './';

const EditorBookInfo = ({ book }) => {
    if (!book?.id) {
        return("Loading...");
    } else {
        return(
            <>
                {/* need buttons to change these attributes */}
                <h2>{`Editing "${book.title}"`}</h2>
                <p>{`${book.totalPages} pages`}</p>
                <p>{`Genre: ${book.genre}`}</p>
                {/* publish button here */}
            </>
        )
    }
};

export default EditorBookInfo;
