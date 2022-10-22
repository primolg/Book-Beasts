import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePage } from "../../store/reducers/editorSlice";

const Autosave = ({ changes, setChanges }) => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    // const [changesMade, setChangesMade] = useState(false);
    const save = async () => {
        const res = await dispatch(updatePage(page));
    };

    // useEffect(() => {
    //     console.log("changes");
    // }, [changes]);

    useEffect(() => {
        // need to ensure this only happens once when page is updated!
        if (changes) {
            setChanges(false);
            const interval = setInterval(() => {
                save();
                console.log("Work saved");
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [changes]);
}

export default Autosave;
