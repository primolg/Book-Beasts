import React from "react";

const ShowSidebar = ({ visible, set }) => {
    return (
            <div className="sidebar-toggle" onClick={() => {
                if (!visible) set(true);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
    )
}

export default ShowSidebar;
