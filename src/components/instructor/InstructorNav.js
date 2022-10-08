import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const InstructorNav = () => {
    const params = useParams();
    // const instructorData = useSelector((state) => state.instructorList.instructorData);
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(fetchInstructorData(params.id));
    // }, []);

    // console.log('INSTRUCTOR DATA?', instructorData);

    return(
        <div className='nav-container'>
            <div className='navbar'>
                <NavLink to={`/instructorPortal/${params.id}/students`} className='instructor-nav-item'>Your Students</NavLink>
                <NavLink to={`/instructorPortal/${params.id}/edit`} className='instructor-nav-item'>Edit Your Account</NavLink>
                <NavLink to={`/instructorPortal/${params.id}`} className='instructor-nav-item'>Back to Portal</NavLink>
            </div>
        </div>
    )
}

export default InstructorNav;