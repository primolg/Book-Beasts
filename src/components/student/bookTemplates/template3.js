import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ImageWidget from './uploadWidget';

const Template3 = ({ setChanges }) => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const pageText = useRef(null);

    function textSetter(){
        setText(pageText.current.innerHTML);
    }

    return (
        <div className="page-outer-div temp3-outer-div">
            <div className='text-img-div'>
                <div className="small-image-page">
                    <ImageWidget 
                        croppingRatio={0.743}
                        maxHeight={175}
                        maxWidth={130} 
                        minWidth={130}
                    />
                </div>
                <div className="small-text-page" ref={pageText} contentEditable="true">
                    Type here...
                </div>
            </div>
        </div>
    );
};

export default Template3;