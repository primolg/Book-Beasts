import React, { useState } from 'react';

const Template2 = () => {

    const cloudName = "ddqp7dojc"; // replace with your own cloud name
    const uploadPreset = "yyl4ywcc";
    const [image, setImage] = useState(undefined);
    
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            cropping: true,
            croppingAspectRatio: 0.9,
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
        <div className="page-outer-div">
            <div className="image-center">
                {image ? 
                    <img src={image} /> : 
                    <button 
                        onClick={()=>myWidget.open()}
                        class="cloudinary-button">
                        Upload image
                    </button>
                }
            </div>
        </div>
    );
};

export default Template2;