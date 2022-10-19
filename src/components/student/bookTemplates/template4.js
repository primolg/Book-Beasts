import React, { useState } from 'react';

const Template4 = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(undefined);
    const cloudName = "ddqp7dojc"; // replace with your own cloud name
    const uploadPreset = "yyl4ywcc";
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            cropping: true,
            showSkipCropButton:false,
            croppingAspectRatio: 0.74285714285,
            maxImageHeight: 175, 
            maxImageWidth: 130, 
            minImageWidth: 130,
            // croppingValidateDimensions: true,
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                setImage(result.info.secure_url)
            } else {
                console.log(result)
            }
        }
    );
    return (
        <div className="page-outer-div temp3-outer-div">
            <div className='text-img-div'>
                <div className="small-image-page">
                    {image ? 
                        <img src={image} /> : 
                        <button 
                            onClick={()=>myWidget.open()}
                            class="cloudinary-button">
                            Upload image
                        </button>
                    }
                </div>
                <div className="small-text-page" contentEditable="true">
                    "type here"
                </div>
            </div>        
        </div>
    );
};

export default Template4;