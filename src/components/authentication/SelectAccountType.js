import React from "react";

const SelectAccountType = ({ formType, setAccountType }) => {
    return (
        <div className="content typeSelection">
            <h2>{formType}</h2>
            <h3>Are you a student or an instructor?</h3>
            <div className="selectBtns">
                <button onClick={() => setAccountType("student")}>I'm a student!</button>
                <button onClick={() => setAccountType("user")}>I'm an instructor</button>
            </div>
        </div>
    )
}

export default SelectAccountType;
