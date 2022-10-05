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
    _deleteStudent: (state, action) => {
      state.instructorData.students = state.instructorData.students.filter((student) =>
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
  _deleteStudent,
} = instructorSlice.actions;

export const fetchInstructors = () => async(dispatch) => {
  const { data: instructorList } = await axios.get("/api/instructors");
  dispatch(getInstructorList(instructorList));
};

export const fetchInstructorData = (instructorId) => async(dispatch) => {
  const { data: instructorData } = await axios.get(`/api/instructors/${instructorId}`);
  dispatch(getInstructor(instructorData));
};

export const updateInstructorData = (updatedInstructor) => async(dispatch) => {
  const { data: updatedInstructorData } = await axios.put(`/api/instructors/${updatedInstructor.id}`, updatedInstructor);
  dispatch(getInstructor(updatedInstructorData));
};

export const deleteStudent = (deletedStudent) => async(dispatch) => {
  const { data: deletedStudentData } = await axios.put (`/api/students/${deletedStudent.id}`, deletedStudentData);
  dispatch(_deleteStudent(deletedStudentData));
  };