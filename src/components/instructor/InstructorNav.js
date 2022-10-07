import React from 'react';
import { Link } from 'react-router-dom';


const InstructorNav = () => {


    return(
        <div className='navContainer'>
            <nav className='navbar'>
                <ul class='instructor-menu'>
                    <li class='instructor-menu-item'>
                        <a href='/instructor/:id/students'>Your Students</a>
                    </li>
                    <li class='instructor-menu-item'>
                        <a href='/instructor/:id/editInstructor'>Edit Your Account</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}