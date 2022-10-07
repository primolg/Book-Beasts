// Displays user status at top of page ()
import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { LogoutButton } from "./";

export default function UserStatus() {
    const user = useSelector(state => state.user);

    // TODO: display user status, setup signup, update display accordingly
    return(
        <div className="userStatus content">
            <Link to="/">
                <p>Home</p>
            </Link>
            
            {user?.id ?
            <>
                <p>{`Hello, ${user.firstName}`}</p>
                <LogoutButton /> 
            </>
            :
            <>
                <div>
                    <Link to="/login">
                        <p className="loginLink">Login</p>
                    </Link>
                    <Link to="/signup">
                        <p className="loginLink">Signup</p>
                    </Link>
                </div>
            </>
            }
        </div>
    )
}