import React, { useState } from 'react';

const charLength = {
    "a": 21,
    "A": 17,
    "b": 21,
    "B": 17,
    "c": 24,
    "C": 16,
    "d": 21,
    "D": 16,
    "e": 21,
    "E": 17,
    "f": 46,
    "F": 19,
    "g": 21,
    "G": 15,
    "h": 21,
    "H": 16,
    "i": 54,
    "I": 43,
    "j": 54,
    "J": 24,
    "k": 24,
    "K": 18,
    "l": 54,
    "L": 21,
    "m": 14,
    "M": 14,
    "n": 21,
    "N": 16,
    "o": 21,
    "O": 15,
    "p": 21,
    "P": 18,
    "q": 21,
    "Q": 15,
    "r": 36,
    "r": 36,
    "R": 16,
    "s": 24,
    "S": 18,
    "t": 43,
    "T": 19,
    "u": 21,
    "U": 16,
    "v": 24,
    "V": 18,
    "w": 16,
    "x": 24,
    "X": 18,
    "y": 24,
    "Y": 18,
    "z": 24,
    "Z": 19
};


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
            minImageWidth: props.minWidth ? props.minWidth : 0,
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