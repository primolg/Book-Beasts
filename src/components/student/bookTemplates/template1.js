import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

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

    // function textSetter(){
    //     setText(pageText.current.innerHTML);
    // }

    return (
        <div className="page-outer-div temp1-outer-div">
            <div className='text-div'>
                <div className="full-text-page" ref={pageText} contentEditable="true">
                </div>
            </div>
        </div>
    );
};

export default Template1;
