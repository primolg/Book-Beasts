import React from "react";

const ToggleButton = ({ state, set }) => {
    return (
        <div id="sidebar-toggle" onClick={() => set(!state)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default ToggleButton;
