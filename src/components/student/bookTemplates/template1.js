import React, { useState, useEffect, useRef } from 'react';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { useSelector, useDispatch } from "react-redux";
import rowLimiter from './rowLimiter';

// when changes are made, "setChanges" to true to signal the autosave
const Template1 = ({ setChanges }) => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page])

    const pageText = useRef(null);

    // useEffect(() => {
    //     setChanges(true);
    // }, [pageText.current?.innerText])

    // function textSetter(){
    //     setText(pageText.current.innerHTML);
    // }

    return (
        <div className="page-outer-div temp1-outer-div">
            <div className='text-div'>
                <textarea className="full-text-page" defaultValue={text } onChange={(event) => setText(event.target.value) }
                    rows="13" cols="30"
                    spellCheck="true"
                    onKeyPress={rowLimiter(event, 17)}
                ></textarea>
            </div>
        </div>
    );
};

export default Template1;
