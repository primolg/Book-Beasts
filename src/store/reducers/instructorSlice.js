import { createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice';
const axios = require('axios');

const instructorSlice = createSlice({
  name: "instructorList",
  initialState: {
    instructorList: [],
    instructorData: {},
    studentList: [],
    currentStudent: {},
    bookList: [],
    currentBook: {},
    allBooks: [],
  },
  reducers: {
    getInstructorList: (state, action) => {
      state.instructorList = action.payload;
      return state;
    },
    getInstructor: (state, action) => {
      state.instructorData = action.payload;
      return state;
    },
    _deleteInstructor: (state, action)=> {
      state.instructorList = state.instructorList.filter((instructor) =>
      instructor.id != action.payload.id
      );
      return state;
    },
    _deleteStudents: (state, action)=> {
      state.studentList = state.studentList.filter((student) =>
      student.id != action.payload.id
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
    getBooks: (state, action) => {
      state.bookList = action.payload;
    },
    getBook: (state, action) => {
      state.currentBook = action.payload;
      return state;
    },
    _deleteBooks: (state, action) => {
      state.bookList = state.bookList.filter((book) =>
      book.id != action.payload.id
      );
      return state;
    },
    _addStudent: (state, action) => {
      state.studentList.push(action.payload);
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
  getBooks,
  getBook,
  _deleteInstructor,
  _deleteStudents,
  _addStudent,
  _deleteStudent,
  _deleteBooks,
} = instructorSlice.actions;

export const fetchInstructors = () => async(dispatch) => {
  try{
    const { data: instructorList } = await axios.get("/api/instructors");
  dispatch(getInstructorList(instructorList));
  }catch(error){
    console.log('FETCH INSTRUCTOR ERROR', error);
  }  
};

export const fetchInstructorData = (instructorId) => 
async(dispatch) => {
  try{
    const token = window.localStorage.getItem('token');
    const { data: instructorData } = await axios.get(`/api/instructors/${instructorId}`,{
      headers: { authorization: token },
    });
    dispatch(getInstructor(instructorData));
  }catch(error){
    console.log('FETCH INSTRUCTOR ERROR', error);
  }
};

export const fetchStudents = (userId) => async(dispatch) => {
  try{
    const { data: studentList } = await axios.get(`/api/instructors/${userId}/students`, {
    });
  dispatch(getStudents(studentList));
  }catch(error){
    console.log('FETCH STUDENTS THUNK ERROR', error)
  } 
};

export const fetchStudentData = (userId, studentId) => async(dispatch) => {
  try{
    const { data: studentData } = await axios.get(`/api/instructors/${userId}/students/${studentId}`, userId, studentId);
  dispatch(getStudent(studentData));
  }catch(error){
    console.log('FETCH STUDENT DATA ERROR', error)
  } 
};

export const fetchBooks = (userId, studentId) => async(dispatch) => {
  try{
    const { data: bookList } = await axios.get(`/instructors/${userId}/students/${studentId}/books`, userId, studentId);
  dispatch(getBooks(bookList));
  }catch(error){
    console.log('FETCH STUDENTS THUNK ERROR', error)
  } 
};

export const fetchBookData = (userId, studentId, bookId) => async(dispatch) => {
  try{
    const { data: bookData } = await axios.get(`/api/instructors/${userId}/students/${studentId}/books/${bookId}`, userId, studentId, bookId);
  dispatch(getBook(bookData));
  }catch(error){
    console.log('FETCH BOOK DATA ERROR', error)
  } 
};


export const updateStudentData = (updatedStudentInfo, userId, studentId) => async(dispatch) => {
  try{
  const { data: updatedStudent } = await axios.put(`/api/instructors/${userId}/students/${studentId}`, updatedStudentInfo, userId, studentId);
  dispatch(getStudent(updatedStudent));
  }catch(error){
    console.log('UPDATE STUDENT THUNK ERROR', error);
  } 
};

export const deleteInstructor = (instructorId, navigate) => async(dispatch) => {
  try{
    const { data: deletedInstructor } = await axios.delete(`/api/instructors/${instructorId}`);
  dispatch(_deleteInstructor(deletedInstructor));
  dispatch(logout());
  }catch(error){
    console.log('DELETE INSTRUCTOR THUNK ERROR', error);
  }
};


export const addStudent = (newStudent, userId) => async(dispatch) => {
  try{
    const{ data: newStudentData } = await axios.post(`/api/instructors/${userId}/students`, newStudent);
    dispatch(_addStudent(newStudentData));
  }catch(error){
    console.log('ADD STUDENT THUNK ERROR ', error);
  }
};

export const updateInstructorData = (updatedInstructor, instructorId) => async(dispatch) => {
  try{
    const { data: updatedInstructorData } = await axios.put(`/api/instructors/${instructorId}`, updatedInstructor);
  dispatch(getInstructor(updatedInstructorData));
  }catch(error){
    console.log('UPDATE INSTRUCTOR THUNK ERROR', error);
  }
};

export const deleteStudent = (studentId) => async(dispatch) => {
  try{
  const { data: deletedStudentData } = await axios.delete(`/api/instructors/:id/students/${studentId}`);
  dispatch(_deleteStudent(deletedStudentData));
  }catch(error){
    console.log('DELETE STUDENT THUNK ERROR', error);
  }
  };
