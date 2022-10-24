import { createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

const studentSlice = createSlice({
  name: "studentList",
  initialState: {},
  reducers: {
    getStudentList: (state, action) => {
      state.studentList = action.payload;
      return state;
    },
    getStudent: (state, action) => {
      state.studentData = action.payload;
      return state;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});

export default studentSlice.reducer;

export const {
  getStudentList,
  getStudent,
} = studentSlice.actions;



export const fetchStudents = () => async(dispatch) => {
  const { data: studentList } = await axios.get("/api/students");
  dispatch(getStudentList(studentList));
};

export const fetchStudentData = (studentId) => async(dispatch) => {
  try {
    // const token = window.localStorage.getItem('token');
    const { data: studentData } = await axios.get(`/api/students/${studentId}`)
    dispatch(getStudent(studentData));
  } catch(error){
    console.log('FETCH STUDENT ERROR', error);
  }
  
};

// export const fetchInstructorData = (instructorId) => 
// async(dispatch) => {
//   try{
//     const token = window.localStorage.getItem('token');
//     const { data: instructorData } = await axios.get(`/api/instructors/${instructorId}`,{
//       headers: { authorization: token },
//     });
//     dispatch(getInstructor(instructorData));
//   }catch(error){
//     console.log('FETCH INSTRUCTOR ERROR', error);
//   }
// };