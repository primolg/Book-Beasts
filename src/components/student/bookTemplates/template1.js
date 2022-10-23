import React, { useState, useEffect, useRef } from 'react';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { SaveProgressButton } from '../';
import rowLimiter from './rowLimiter';

const Template1 = ({ page }) => {
    const [text, setText] = useState("");

    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page])

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
