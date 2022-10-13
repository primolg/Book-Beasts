import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorData } from '../../store/reducers/instructorSlice';
import { useParams, Link } from 'react-router-dom';
import StudentTable from './StudentTable';
import InstructorNav from './InstructorNav';
import AddStudent from './AddStudent';


const InstructorStudents = () => {
    

    return(
        <div>
            <div>
            <InstructorNav/>
            </div>
            <div>
               <AddStudent  />
            <StudentTable />
            </div>
        </div>
    )
}

export default InstructorStudents;