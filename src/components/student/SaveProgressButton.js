import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook, updatePage } from "../../store/reducers/editorSlice";

const SaveProgressButton = ({ page, content }) => {
    const dispatch = useDispatch();

    const save = async () => {
        const res = await dispatch(updatePage({
            ...page, content,
        }));
    };
    
    // currently this component is not in use
    return(
        <button onClick={() => save()}>Save progress!</button>
    )
};

export default SaveProgressButton;
