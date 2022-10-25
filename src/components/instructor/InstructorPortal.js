import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorData } from '../../store/reducers/instructorSlice';
import { useParams } from 'react-router-dom';
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";


const InstructorPortal = () => {
    const params = useParams();
    const instructorData = useSelector((state) => state.instructorList.instructorData);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchInstructorData(params.id));
    }, []);


    return(

        
        <div className='portal-tab'>
            {instructorData ? (
                <>
                <div className='instructor-portal-wrapper'>
                    <div className='portal-row'>
                        <div className='portal-column'>
                            <div className='blue-column'>
                            <h3>Guides</h3>
                            <div className="video-container">
                                <iframe width="640" height="360" src="//www.youtube.com/embed/ukKd8W3Bvo0" frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </div>
                        </div>
                        <div className='portal-column'>
                            <div className='green-column'>
                            <h3>Join our Community!</h3>
                            <h5>Thank you for being a Book Beasts Member!</h5>
                            <p>We value your feedback!
                                Please leave us a review on Google.
                            </p>
                            <a className='btn-social' href="https://g.page/r/CXVB8EEVw2nvEAg/review">
                                    <FaGoogle/>
                                </a>
                            <hr/>
                            <p>Like us on Facebook to get updates and information.
                                Follow us on Instagram to connect with the growing
                                Book Beast community!
                            </p>
                            <a className='btn-social' href="https://www.facebook.com/bookbeastscommunity/">
                                   <FaFacebookSquare/>
                                </a>
                            <hr/>
                            <p>Sign up for our email newsletter for more information
                                and tips!
                            </p>
                            <div>
                            <input placeholder='email address goes here' type="text" />
                                <button className='small-btn draw-border' onClick={() => alert("Email sent!")}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>

            ) : (
                <h3>This is not a valid Instructor</h3>
            )}

        </div>
    )
};

export default InstructorPortal;