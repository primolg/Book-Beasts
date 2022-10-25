import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

const LogoutButton = ({ text }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        alert("Successfully logged out");
        navigate("/");
    }

    if (text) {
        return(
            <p onClick={handleLogout} className="link">Logout</p>
        );
    } else {
        return(
            <button onClick={handleLogout} id="logout-button">Logout</button>
        );
    }
}

export default LogoutButton;
