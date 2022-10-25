import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { LogoutButton } from "../authentication";

const Sidebar = ({ set, visible }) => {
    const user = useSelector(state => state.user);

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

    useEffect(() => {
        set(false);
    }, [userType]);

    // === user-specific routing === //
    let sidebarContents = [];
    switch (userType) {
        case "instructor":
            sidebarContents = [
                { name: "Home page", route: "/" },
                { name: "View all books", route: "/books" },
                { name: "Instructor portal", route: `/instructorPortal/${user?.id}` },
            ];
            break;
        case "student":
            sidebarContents = [
                { name: "Home page", route: "/" },
                // { name: "View all books", route: "/books" },
                { name: "Your books", route: `/student` },
            ];
            break;
        default: // for "guest"
            sidebarContents = [
                { name: "Home page", route: "/" },
                // { name: "View all books", route: "/books" },
                { name: "Login", route: "/login" },
                { name: "Signup", route: "/signup" },
            ];
            break;
    }

    return(
        <>
            <div id="sidebar" className={visible ? "visible" : null }>
                <div className="sidebar-header">
                    <h3>{user?.id ? `Hello, ${user?.firstName}` : "Welcome to Book Beasts"}</h3>
                    <p id="x" onClick={() => set(false)}>x</p>
                </div>

                <ul className="sidebar-contents">
                    {sidebarContents.map((itm, i) =>
                        <li key={i} onClick={() => set(false)}>
                            <Link to={itm.route}>
                                {itm.name}
                            </Link>
                        </li>
                    )}
                    {userType !== "guest" && <LogoutButton text={true} onClick={() => set(false)} />}
                </ul>
            </div>
        </>
    )
}

export default Sidebar;
