import React, { useState } from 'react';
import imageTools from './ImageGetter';

const Template3 = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(undefined);
    const [start, setStart] = useState(false)
    return (
        <div className="page-outer-div temp3-outer-div">
            <div className='text-img-div'>
                <div className="small-image-page">
                    {image ? 
                        <img src={image} /> : 
                        <button 
                            onClick={()=>imageTools.smallImage.open()}
                            class="cloudinary-button">
                            Upload image
                        </button>
                    }
                </div>
                <div className="small-text-page" id="pageText" contentEditable="true">
                    {start ? "" : "Type Here"}
                </div>
            </div>
        </div>
    );
};

export default Template3;