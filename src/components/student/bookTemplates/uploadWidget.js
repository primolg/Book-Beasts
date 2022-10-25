import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUploadImg, updateCoverArt } from "../../../store/reducers/editorSlice";

const ImageWidget = (props) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(undefined);
    const book = useSelector(state => state.editor.currentBook);
    const page = useSelector(state => state.editor.currentPage);
    const [isFirstLoad, setFirstLoad] = useState(true);

    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "ddqp7dojc",
            uploadPreset: "yyl4ywcc",
            cropping: props.croppingRatio ? true : false,
            croppingAspectRatio: props.croppingRatio,
            maxImageHeight: props.maxHeight ? props.maxHeight : 1000,
            maxImageWidth: props.maxWidth ? props.maxWidth : 1000,
            clientAllowedFormats: ["jpeg", "jpg", "png"],
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                // console.log("Setting image");
                setImage(result.info.secure_url)
            } else {
                // console.log("Upload error")
            }
        }
    )

    useEffect(() => {
        if (isFirstLoad && image) {
            setFirstLoad(false);
        } else if (isFirstLoad && props.isCover && !props.hasCover) {
            setFirstLoad(false);
        }

        console.log("\nprops.isCover:", props.isCover);
        console.log("props.hasCover:", props.hasCover);
        console.log("image:", image);
        console.log("isFirstLoad:", isFirstLoad);

        if (props.isCover) {
            if (!image && props.hasCover) {
                console.log("here cover 1")
                setImage(book.coverArt);
            } else if (!isFirstLoad) {
                console.log("here cover 2")
                dispatch(updateCoverArt(book.id, image));
            }
        } else {
            if (image && (!isFirstLoad || !props.hasImage)) {
                // console.log("here page 1");
                dispatch(setUploadImg(image));
                setImage(image);
            } else if (props.hasImage) {
                // console.log("here page 2");
                setImage(props.image);
            }
        }
    }, [image]);

    useEffect(() => {
        if (!props.isCover && props.hasImage) {
            setImage(props.image || "");
            setFirstLoad(true);
        }
    }, [props.image])
    
    return (
        <div className={!props.isCover ? "upload-widget-page-template" : "upload-widget-cover" }>
            {props.top ? (image && <img src={image} className={props.isCover? "book-form-coverart" : "img-upload"}/>): <></>}
            <button
                onClick={()=>myWidget.open()}
                className="cloudinary-button">
                    {props.hasCover ? "Replace cover art" :
                        props.isCover ? "Upload cover art" :
                        props.hasImage ? "Replace image" : "Upload image"}
            </button>
            {props.top ? <></> : (image && <img src={image} className={props.isCover? "book-form-coverart" : "img-upload"}/>)}
        </div>
    )
}
    
export default ImageWidget;