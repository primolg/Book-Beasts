import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const DeleteStudent = ( { student }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteStudent(student));   
    };

    console.log('DELETE STUDENT', student);

    return (
        <>
        <Popup trigger={<button>Delete</button>} position="right center">
            <div>
                    <p>Are you sure you want to delete this student?
                    </p>
                    <button onClick={handleDelete}>YES</button>
                </div>
        </Popup>
        </>
    )
};

export default DeleteStudent;