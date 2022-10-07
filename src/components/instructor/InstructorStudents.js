import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorData } from '../../store/reducers/instructorSlice';
import { useParams } from 'react-router-dom';
import StudentTable from './StudentTable';
import InstructorNav from './InstructorNav';


const InstructorStudents = () => {

    return(
        <div>
            <div>
            <InstructorNav/>
            </div>
            <div>
            <StudentTable />
            </div>
        </div>
    )
}

export default InstructorStudents;