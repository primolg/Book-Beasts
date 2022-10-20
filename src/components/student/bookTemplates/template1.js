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
        console.log(pageText.current);
    }
    // const pageText = document.getElementById("pageText")
    // console.log(pageText);

    return (
        <div className="page-outer-div temp1-outer-div">
            <div className='text-div'>
                <div className="full-text-page" ref={pageText} contentEditable="true" onClick={textSetter}>
                    helloo
                </div>
            </div>
        </div>
            //         {/* <textarea 
            //             onChange={(event)=>setText(event.target.value)} 
            //             rows="20"
            //             cols="41"
            //             value={text}
            //             placeholder="Write your story here...">
            //         </textarea> */}
    );
};

export default Template1;
