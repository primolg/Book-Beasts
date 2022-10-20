import React, { useState } from 'react';
import ImageWidget from './uploadWidget';

const Template4 = () => {
    const [text, setText] = useState('');
    
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
                <div className="small-text-page" contentEditable="true">
                    "type here"
                </div>
            </div>        
        </div>
    );
};

export default Template4;