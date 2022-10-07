import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../../store/reducers/instructorSlice";


const DeleteStudent = ( { student }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteStudent(student, navigate));
    }

    return (
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
};

export default DeleteStudent;