// Displays user status at top of page
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { LogoutButton } from "./";
import { verifyToken } from "../../store/reducers/authSlice";
import Home from "../home/Home";
import AllBooks from "../books/AllBooks";

export default function UserStatus() {
    const token = localStorage.getItem("token");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // Allows user to stay logged if they have a token in localStorage
    if (!user?.firstName && token) {
        dispatch(verifyToken(token));
    }

    return(
        <div className="userStatus content">
            <Link to="/" element={<Home/>}>
                <p>Home</p>
            </Link>

            <Link to="/books" element={<AllBooks/>}>
                <p>All Books</p>
            </Link>

            {token?.length && user?.firstName ?
            <>
                <p>{`Hello, ${user.firstName}`}</p>
                <LogoutButton text={true}/> 
                <Link to={`/instructorPortal/${user.id}`}>
                    <p className="loginLink">Instructor Portal</p>
                    </Link>
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