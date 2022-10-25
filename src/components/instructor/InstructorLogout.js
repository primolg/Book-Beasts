import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import { ToastContainer, toast, Slide } from "react-toastify";

const InstructorLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popupTimer = 3000;
    
    const handleLogout = async() => {
        const res = await dispatch(logout());
        if (res) toast.success("Successfully Logged Out!");
        else toast.error("Loggout Error");
        navigate("/");
    }

    return(
            <>
            <button className="small-btn inst-logout" onClick={handleLogout}>Logout</button>
            <ToastContainer
                position="top-center"
                hideProgressBar={true}
                transition={Slide}
                autoClose={popupTimer}
            />
            </>
        );
    
};

export default InstructorLogout;