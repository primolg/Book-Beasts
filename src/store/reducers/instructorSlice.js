import { createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

const instructorSlice = createSlice({
  name: "instructorList",
  initialState: {},
  reducers: {
    getInstructorList: (state, action) => {
      state.instructorList = action.payload;
      return state;
    },
    getInstructor: (state, action) => {
      state.instructorData = action.payload;
      return state;
    },
    // addInstructor: (state, action) => {
    //   state.instructorList.push(action.payload);
    //   return state;
    // },
    _deleteInstructor: (state, action)=> {
      state.instructorList = state.instructorList.filter((instructor) =>
      instructor.id != action.payload.id
      );
      return state;
    },
    getStudents: (state, action) => {
      state.studentList = action.payload;
    },
    getStudent: (state, action) => {
      state.currentStudent = action.payload;
      return state;
    },
    _addStudent: (state, action) => {
      state.currentStudent = action.payload;
      return state;
    },
    _deleteStudent: (state, action) => {
      state.studentList = state.studentList.filter((student) =>
          student.id !== action.payload.id
    );
      return state;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});

export default instructorSlice.reducer;

export const {
  getInstructorList,
  getInstructor,
  getStudents,
  getStudent,
  _deleteInstructor,
  _addStudent,
  _deleteStudent,
} = instructorSlice.actions;

export const fetchInstructors = () => async(dispatch) => {
  const { data: instructorList } = await axios.get("/api/instructors");
  dispatch(getInstructorList(instructorList));
};

export const fetchInstructorData = (instructorId) => 
async(dispatch) => {
  try{
    const token = window.localStorage.getItem('token');
    console.log('FETCH INS THUNK TOKEN', token)
    console.log('FETCH INST THUNK ID', instructorId);
    const { data: instructorData } = await axios.get(`/api/instructors/${instructorId}`,{
      headers: { authorization: token },
    });
    dispatch(getInstructor(instructorData));
  }catch(error){
    console.log('FETCH INSTRUCTOR ERROR', error);
  }
  
};

export const fetchStudents = (userId) => async(dispatch) => {
  const { data: studentList } = await axios.get(`/api/instructors/:id/students`, userId);
  console.log('FETCH STUDENTS THUNK', userId);
  dispatch(getStudents(studentList));
};

export const fetchStudentData = (studentId) => async(dispatch) => {
  console.log('FETCH STUDENT DATA THUNK ', studentId);
  const { data: studentData } = await axios.get(`/api/instructors/:id/students/${studentId}`, studentId);
  
  dispatch(getStudent(studentData));
};

export const updateStudentData = (updatedStudentInfo, userId, studentId) => async(dispatch) => {
  console.log('STUDENT PUT THUNK ', updatedStudentInfo, userId, studentId)
  const { data: updatedStudent } = await axios.put(`/api/instructors/${userId}/students/${studentId}`, updatedStudentInfo, userId, studentId);
  dispatch(getStudent(updatedStudent));
};

export const deleteInstructor = (instructorData, navigate) => async(dispatch) => {
  const { data: deletedInstructor } = await axios.delete(`/api/instructors/${instructorData.id}`);
  dispatch(_deleteInstructor(deletedInstructor));
  navigate('/');
};

export const addStudent = (newStudent, userId) => async(dispatch) => {
  try{
    console.log('ADD STUDENT THUNK', newStudent);
    console.log('ADD STUDENT USERID', userId);
    const{ data: newStudentData } = await axios.post(`/api/instructors/${userId}/students`, newStudent);
    dispatch(_addStudent(newStudentData));
  }catch(error){
    console.log('ADD STUDENT THUNK ERROR ', error);
  }
};

// export const updateInstructorData = (updatedInstructor) => async(dispatch) => {
//   const { data: updatedInstructorData } = await axios.put(`/api/instructors/${updatedInstructor.id}`, updatedInstructor);
//   dispatch(getInstructor(updatedInstructorData));
// };

export const deleteStudent = (student) => async(dispatch) => {
  console.log('DELETE STUDENT', student)
  const { data: deletedStudentData } = await axios.delete(`/api/instructors/:id/students/${student.id}`);
  dispatch(_deleteStudent(deletedStudentData));
  
  };