import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorData } from '../../store/reducers/instructorSlice';
import { useParams } from 'react-router-dom';
import InstructorNav from './InstructorNav';


const InstructorPortal = () => {
    const params = useParams();
    const instructorData = useSelector((state) => state.instructor.instructorData);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchInstructorData(params.id));
    }, []);

    

    return(
        <div className='instructorPortal'>
            <InstructorNav />
            {instructorData ? (
                <>
                <h1>Welcome {instructorData.firstName}!</h1>
                <h3>Email: {instructorData.email}</h3>

                <h1>Guides and how-to container</h1>
                <h1>Join our Community container</h1>
                </>
                
            ): (
                <h3>This is not a valid Instructor</h3>
            )}

        </div>
    )
};

export default InstructorPortal;