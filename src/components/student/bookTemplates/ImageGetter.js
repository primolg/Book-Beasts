import React, { useState } from 'react';

const smallImage = () => {
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "ddqp7dojc",
            uploadPreset: "yyl4ywcc",
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
                // console.log(result)
            }
        }
    );
    return myWidget
}
const largeImage = () => {

    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "ddqp7dojc",
            uploadPreset: "yyl4ywcc",
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
                // console.log(result)
            }
        }
    );
    return myWidget
}

const imageTools = {smallImage: smallImage, largeImage: largeImage};

export default imageTools