import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";
// import { Link } from 'react-router-dom';

export default function NewUserForm() {
    const dispatch = useDispatch();
    
    return(
        <div>
            NewUserForm
        </div>
    )
}
