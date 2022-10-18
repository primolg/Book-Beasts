import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInstructorData } from "../../../store/reducers/instructorSlice";
import InstructorLogout from "../InstructorLogout";


const InstructorHeader = ({ instructorId }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const instructor = useSelector((state) => state.instructorList.instructorData);

    useEffect(() => {
        dispatch(fetchInstructorData(params.id));
    }, []);


    return(
        <div className="instructor-header">
            <h1 id="header-welcome" key={params.id}>{`Welcome ${instructor.firstName}!`}</h1>
            <InstructorLogout/>
        </div>
    )
}

export default InstructorHeader;