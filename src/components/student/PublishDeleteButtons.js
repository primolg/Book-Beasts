import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBook, deleteBook } from "../../store/reducers/editorSlice";

const PublishDeleteButtons = () => {
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        if (name==="publish") {
            console.log(name, "not yet implemented");
        } else if (name==="delete") {
            console.log(name, "not yet implemented");
        }
    }
    
    return(
        <div id="publish-delete-container">
            <button id="delete-button" onClick={handleClick} name="delete">Delete Book</button>

            <button id="publish-button" onClick={handleClick} name="publish">Publish Book</button>
        </div>
    )
};

export default PublishDeleteButtons;
