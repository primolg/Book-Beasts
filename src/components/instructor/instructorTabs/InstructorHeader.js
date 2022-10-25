import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchInstructorData } from "../../../store/reducers/instructorSlice";
import InstructorLogout from "../InstructorLogout";
import { logout } from "../../../store/reducers/authSlice";


const InstructorHeader = ({ instructorId }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const instructor = useSelector((state) => state.instructorList.instructorData);

    useEffect(() => {
        dispatch(fetchInstructorData(params.id));
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        alert("Successfully logged out");
        navigate("/");
    }

    return(
        
        <div id="inst-header-container">
            <div id="inst-header-button-title">
             <h2 id="inst-header-title" key={params.id}>{`Welcome ${instructor.firstName}!`}</h2>
            </div>
           
                <Link  to="/books"><button className="small-btn">Home</button></Link>
                <InstructorLogout />
            
        </div>
    )
}

export default InstructorHeader;
