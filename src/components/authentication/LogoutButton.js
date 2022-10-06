import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
// import { Link } from 'react-router-dom';

export default function LogoutButton() {
    const dispatch = useDispatch();

    return(
        <button onClick={() => dispatch(logout())}>
            Log out
        </button>
    )
}
