import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../../store/reducers/instructorSlice';
import { useParams } from 'react-router-dom';
import StudentTable from './StudentTable';
import InstructorNav from '../instructorTabs/InstructorNav';
import AddStudent from './AddStudent';


const InstructorStudents = ({ activeTab, setActiveTab }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const studentList = useSelector((state) => state.instructorList.studentList);
    
    useEffect(() => {
        dispatch(fetchStudents(params.id));
    }, []);

    return(
        <div className='tooltipBoundary' id="students-tab">
            <AddStudent activeTab={activeTab} setActiveTab={setActiveTab} />
            <StudentTable studentList={studentList} activeTab={activeTab} setActiveTab={setActiveTab}/>
            
        </div>
    )
}

export default InstructorStudents;