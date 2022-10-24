import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUploadImg } from "../../../store/reducers/editorSlice";

const ImageWidget = (props) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(undefined);
    const book = useSelector(state => state.editor.currentBook);
    const page = useSelector(state => state.editor.currentPage);

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
            dispatch(setUploadImg(image));
        } else if (!props.isCover && props.hasImage) {
            setImage(props.image)
        } else if (props.isCover && props.hasCover) {
            setImage(book.coverArt);
        }
    }, [image]);
    
    return (
        <div className="upload-widget-page-template">
            {image && <img src={image} className={props.isCover? "book-form-coverart" : "img-upload"}/>}
            <button
                onClick={()=>myWidget.open()}
                className="cloudinary-button">
                    {props.hasCover ? "Replace cover art" :
                        props.isCover ? "Upload cover art" :
                        props.hasImage ? "Replace image" : "Upload image"}
            </button>
        </div>
    )
}
    
export default ImageWidget;