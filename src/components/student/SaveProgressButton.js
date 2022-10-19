import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook, updatePage } from "../../store/reducers/editorSlice";

// book changes saved automatically => this is for pages
const SaveProgressButton = ({ page, content }) => {
    const dispatch = useDispatch();

    const save = async (page) => {
        console.log("content:", content);
        const res = await dispatch(updatePage({
            ...page, content,
        }));
        if (!res) alert("Could not save page data");
    };
    
    return(
        <button onClick={() => save(page)}>Save progress!</button>
    )
};

export default SaveProgressButton;
