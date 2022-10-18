import React, { useEffect } from "react";
import { SaveProgressButton } from './';

const EditorBookInfo = ({ book }) => {
    if (!book?.id) {
        return("Loading...");
    } else {
        return(
            <div id="basicInfoContainer">
                {/* need buttons to change these attributes */}
                <div className="attribute">
                    <h2>{`"${book.title}"`}</h2>
                    <button>✏️</button>
                </div>

                <div className="attribute">
                    <p>{`Genre: ${book.genre}`}</p>
                    <button>✏️</button>
                </div>

                <div className="attribute">
                    <p>{`Update cover art: `}</p>
                    <button>✏️</button>
                </div>

                <p>{`${book.totalPages} pages`}</p>
                {/* publish button here */}
            </div>
        )
    }
};

export default EditorBookInfo;
