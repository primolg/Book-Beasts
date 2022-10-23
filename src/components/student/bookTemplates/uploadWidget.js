import React, { useState } from 'react';

const ImageWidget = (props) => {
    const [image, setImage] = useState(undefined);

    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "ddqp7dojc",
            uploadPreset: "yyl4ywcc",
            cropping: props.croppingRatio ? true : false,
            croppingAspectRatio: props.croppingRatio,
            maxImageHeight: props.maxHeight ? props.maxHeight : 1000,
            maxImageWidth: props.maxWidth ? props.maxWidth : 1000,
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                setImage(result.info.secure_url)
            } else {
                console.log(result)
            }
        }
    )
    
    return (
        <>
        {image ? 
            <img src={image} /> : 
            <button 
            onClick={()=>myWidget.open()}
            class="cloudinary-button">Upload image</button>
        }
        </>
    )
}
    
export default ImageWidget;