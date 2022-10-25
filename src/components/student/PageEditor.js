import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOtherPage } from "../../store/reducers/editorSlice";
import { TemplateContainer, PageEditorOptions } from "./";

const PageEditor = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.editor.currentPage);
    const text = useSelector(state => state.editor.currentText);
    
    const [pageToUpdate, setPageToUpdate] = useState({
        id: null,
        bookId: null,
        content: null,
    });

    const savePreviousAndSwitchPages = async () => {
        if (page.id) {
            if (pageToUpdate.id) {
                // console.log("Saving page...");
                await dispatch(updateOtherPage(pageToUpdate));
            }
            // console.log("Switching pages");
            setPageToUpdate({
                id: page.id,
                bookId: page.bookId,
                content: page.content
            });
        }
    };

    // currently saves every time user switches pages (regardless of if changes were made
    // shouldn't be too hard to optimize, but currently we don't have time to fix for deadline
    useEffect(() => {
        savePreviousAndSwitchPages();
    }, [page.id]);

    useEffect(() => {
        if (page.id) {
            // console.log("Updating text in container");
            setPageToUpdate({
                ...pageToUpdate,
                content: text
            });
        }
    }, [text]);

    return(
        <>  
            <PageEditorOptions />
            <TemplateContainer />
        </>
    );
};

export default PageEditor;
