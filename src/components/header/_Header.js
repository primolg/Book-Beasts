import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, Link } from 'react-router-dom';
// import { LogoutButton } from "../authentication";
import { verifyToken } from "../../store/reducers/authSlice";
import { Sidebar, ToggleButton, SearchBar } from "./";

const Header = () => {
    const token = localStorage.getItem("token");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // Allows user to stay logged if they have a token in localStorage
    if (!user?.firstName && token) {
        dispatch(verifyToken(token));
    }

    // guest, student, instructor
    const [userType, setUserType] = useState("guest");
    useEffect(() => {
        if (user?.age) {
            setUserType("student");
        } else if (user?.id) {
            setUserType("instructor");
        } else {
            setUserType("guest");
        }
    }, [user]);

    const [sidebarVisibility, setSidebarVisibility] = useState(false);
    
    return(
        <div id="header-container">
            <ToggleButton set={setSidebarVisibility} state={sidebarVisibility} />
            <SearchBar />
            
            <Sidebar type={userType} visibility={sidebarVisibility} />
        </div>
    )
}

export default Header;
