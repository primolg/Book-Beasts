// Displays user status at top of page
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { LogoutButton } from "./";
import { verifyToken } from "../../store/reducers/authSlice";

export default function UserStatus() {
    const token = localStorage.getItem("token");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Allows user to stay logged if they have a token in localStorage
    if (!user?.firstName && token) {
        // Seed data IDs need to be static for this to work as intended
        dispatch(verifyToken(token));
    }

    return(
        <div className="userStatus content">
            <Link to="/">
                <p>Home</p>
            </Link>

            {token?.length && user?.firstName ?
            <>
                <p>{`Hello, ${user.firstName}`}</p>
                <LogoutButton text={true}/> 
            </>
            :
            <>
                <div>
                    <Link to="/login">
                        <p className="loginLink">Login</p>
                    </Link>
                    <Link to="/signup">
                        <p className="loginLink">Signup</p>
                    </Link>
                </div>
            </>
            }
        </div>
    )
}