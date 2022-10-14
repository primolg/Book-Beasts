import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '../authentication/index.js';


const InstructorNav = ({ instructor }) => {
    const params = useParams();

   

    return(
        <div className='nav-container'>
            <div className='navbar'>
                <NavLink to={`/instructorPortal/${params.id}/students`} className='instructor-nav-item'>Your Students</NavLink>
                <NavLink to={`/instructorPortal/${params.id}/edit`} instructor={instructor} className='instructor-nav-item'>Edit Your Account</NavLink>
                <NavLink to={`/instructorPortal/${params.id}`} className='instructor-nav-item'>Back to Portal</NavLink>
                <LogoutButton />
            </div>
        </div>
    )
}

export default InstructorNav;