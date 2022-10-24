import React, { useState, useEffect, useRef } from 'react';
// import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { useSelector, useDispatch } from "react-redux";
import { updatePage, setCurrentText } from "../../../store/reducers/editorSlice";
import rowLimiter from './rowLimiter';
// import { Autosave } from "../";

const Template1 = () => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page.content]);

    useEffect(() => {
        dispatch(setCurrentText(text));
        // if (page.id) {
        //     const interval = setInterval(() => {
        //         console.log("Saving...");
        //         dispatch(updatePage({
        //             ...page,
        //             content: text,
        //         }))
        //     }, 15000);
        //     return () => clearInterval(interval);
        // }
    }, [text])

    return (
        <div className="page-outer-div temp1-outer-div">
            <div className='text-div'>
                <textarea className="full-text-page" value={text} onChange={(event) => setText(event.target.value) }
                    rows="13" cols="30"
                    spellCheck="true"
                    onKeyPress={rowLimiter(event, 17)}
                ></textarea>
            </div>
        </div>
    );
};

export default Template1;
