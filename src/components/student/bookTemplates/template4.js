import React, { useState, useRef } from 'react';
import ImageWidget from './uploadWidget';

const Template4 = () => {
    const [text, setText] = useState('');
    const pageText = useRef(null);

    function textSetter(){
        setText(pageText.current.innerHTML);
    }

    return (
        <div className="page-outer-div temp4-outer-div">
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
                    <br></br><br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </div>        
        </div>
    );
};

export default Template4;