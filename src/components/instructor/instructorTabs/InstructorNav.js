import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '../../authentication/index.js';
import {
    InstructorPortal,
    EditInstructor,
    InstructorStudents,
    InstructorHeader
} from '../';
import {
    TabNavItem,
    TabContent
} from "./";


const InstructorNav = () => {
    const [ activeTab, setActiveTab ] = useState("tab1");
    const params = useParams();

    return(
        <><InstructorHeader /><div className='instructor-tabs'>
            <ul className='instructor-nav'>
                <TabNavItem title="Portal Home" id="home" activeTab={setActiveTab} setActiveTab={setActiveTab} />
                <TabNavItem title="Student Roster" id="roster" activeTab={setActiveTab} setActiveTab={setActiveTab} />
                <TabNavItem title="Profile & Setting" id="edit" activeTab={setActiveTab} setActiveTab={setActiveTab} />
            </ul>
            <div className='outlet'>
                <TabContent id="home" activeTab={activeTab}>
                    <InstructorPortal />
                </TabContent>
                <TabContent id="roster" activeTab={activeTab}>
                    <InstructorStudents />
                </TabContent>
                <TabContent id="edit" activeTab={activeTab}>
                    <EditInstructor />
                </TabContent>
            </div>
        </div></>
    )
}

export default InstructorNav;

{/* <div className='nav-container'>
<div className='navbar'>
    <NavLink to={`/instructorPortal/${params.id}/students`} className='instructor-nav-item'>Your Students</NavLink>
    <NavLink to={`/instructorPortal/${params.id}/edit`} className='instructor-nav-item'>Edit Your Account</NavLink>
    <NavLink to={`/instructorPortal/${params.id}`} className='instructor-nav-item'>Back to Portal</NavLink>
    <LogoutButton />
</div>
</div> */}