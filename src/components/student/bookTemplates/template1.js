import React, { useState, useEffect, useRef } from 'react';
import { SaveProgressButton } from '../';

const Template1 = ({ page }) => {
    const [text, setText] = useState("");
    
    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page])

    const pageText = useRef(null);

    function textSetter(){
        setText(pageText.current.innerHTML);
    }

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
