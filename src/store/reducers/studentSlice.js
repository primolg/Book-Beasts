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
  const { data: studentData } = await axios.get(`/api/students/${studentId}`);
  dispatch(getStudent(studentData));
  
};