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
    const [ activeTab, setActiveTab ] = useState("portal-home");
    const params = useParams();

    return(
        <><InstructorHeader />
        <div className='instructor-tabs tooltipBoundary'>
            <ul className='instructor-nav'>
                <TabNavItem title="Portal Home" id="portal-home" activeTab={setActiveTab} setActiveTab={setActiveTab} />
                <TabNavItem title="Student Roster" id="roster" activeTab={setActiveTab} setActiveTab={setActiveTab} />
                <TabNavItem title="Profile & Setting" id="edit" activeTab={setActiveTab} setActiveTab={setActiveTab} />
            </ul>
            <div className='outlet'>
                <TabContent id="portal-home" activeTab={activeTab}>
                    <InstructorPortal />
                </TabContent>
                <TabContent id="roster" activeTab={activeTab}>
                    <InstructorStudents activeTab={activeTab} setActiveTab={setActiveTab}/>
                </TabContent>
                <TabContent id="edit" activeTab={activeTab}>
                    <EditInstructor activeTab={activeTab} setActiveTab={setActiveTab} />
                </TabContent>
            </div>
        </div></>
    )
}

export default InstructorNav;
