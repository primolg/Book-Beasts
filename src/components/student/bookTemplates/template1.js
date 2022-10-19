import React, { useState, useEffect } from 'react';
import { SaveProgressButton } from '../';

const Template1 = ({ page }) => {
    const [text, setText] = useState("");
    
    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page])

    return (
        <>
            <div className="page-outer-div">
                <div className="t1-textarea">
                    <textarea 
                        onChange={(event)=>setText(event.target.value)} 
                        rows="20"
                        cols="41"
                        value={text}
                        placeholder="Write your story here...">
                    </textarea>
                </div>
            </div>
            <SaveProgressButton page={page} content={text} />
        </>
    );
};

export default Template1;
