import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePage } from "../../store/reducers/editorSlice";

// most likely should be in template container so it has access to page + content

const Autosave = ({ page, content }) => {
    const dispatch = useDispatch();

    const save = async () => {
        const res = await dispatch(updatePage({
            ...page, content,
        }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            save();
            console.log("Work saved");
        }, 30000);
        return () => clearInterval(interval);
    }, [content]);
}

export default Autosave;
