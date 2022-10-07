import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorData } from '../../store/reducers/instructorSlice';
import { useParams } from 'react-router-dom';
import StudentTable from './StudentTable';

const InstructorPortal = () => {
    const params = useParams();
    const instructorData = useSelector((state) => state.instructorList.instructorData);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchInstructorData(params.id));
    }, []);

    console.log('INSTRUCTOR DATA?', instructorData);

    return(
        <div className='instructorPortal'>
            {instructorData ? (
                <>
                <h1>Welcome {instructorData.firstName}!</h1>
                <h3>Email: {instructorData.email}</h3>

                <StudentTable />
                <h5>Edit student link in Table</h5>
                <h3>Add Student Placeholder</h3>
                <h3>Edit Instructor Placeholder</h3>
                </>
                
            ): (
                <h3>This is not a valid Instructor</h3>
            )}

        </div>
    )
};

export default InstructorPortal;