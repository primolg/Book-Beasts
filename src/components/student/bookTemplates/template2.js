import React, { useState } from 'react';



const Template2 = () => {

    const [image, setImage] = useState(undefined);
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "ddqp7dojc",
            uploadPreset: "yyl4ywcc",
            cropping: true,
            showSkipCropButton:false,
            croppingAspectRatio: 0.74285714285,
            maxImageHeight: 300, 
            maxImageWidth: 200, 
            // minImageWidth: 200,
            // croppingValidateDimensions: true,
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                setImage(result.info.secure_url)
            } else {
                // console.log(result)
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