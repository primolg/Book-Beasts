import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

const InstructorLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        alert("Successfully logged out");
        navigate("/");
    }

    return(
            
            <button className="btn draw-border" onClick={handleLogout}>Logout</button>
        );
    
};

export default InstructorLogout;