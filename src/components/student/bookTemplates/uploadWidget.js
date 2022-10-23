import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUploadImg } from "../../../store/reducers/editorSlice";

const ImageWidget = (props) => {
    const dispatch = useDispatch();
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
                // console.log(result)
            }
        }
    )

    useEffect(() => {
        if (image) {
            console.log(image);
            dispatch(setUploadImg(image));
        }
    }, [image]);
    
    return (
        <>
        {image ? 
            <img src={image} className={props.isCover? "book-form-coverart" : "img-upload"}/> : 
            <button 
            onClick={()=>myWidget.open()}
            className="cloudinary-button">
                {props.hasCover ? "Replace cover art" : props.isCover ? "Upload cover art" : "Upload image"}
            </button>
        }
        </>
    )
}
    
export default ImageWidget;