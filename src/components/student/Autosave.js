import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePage } from "../../store/reducers/editorSlice";

const Autosave = ({ changes, setChanges }) => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    const save = async () => {
        const res = await dispatch(updatePage(page));
    };

    // currently this component is not in use
}

export default Autosave;
