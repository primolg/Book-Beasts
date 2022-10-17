import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

const editorSlice = createSlice({
    name: "editorSlice",
    initialState: {},
    reducers: {
        setBook: (state, action) => {
            return action.payload
        },
        _updateBook: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        // _updateSinglePage: (state, action) => {
        //     // find page in .pages, only update that one
        // },
        _updatePages: (state, action) => {
            return {
                ...state,
                pages: action.payload,
            };
        }
    },
});

export default editorSlice.reducer;
export const { setBook, _updateBook, _updatePages } = editorSlice.actions;

// gets book structured for editing
export const fetchBook = (bookId) => async (dispatch) => {
    const { data: book } = await axios.get(`/api/editor/${bookId}`);
    if (book) {
        console.log(book);
        dispatch(setBook(book));
    }
}

export const createNewBook = (book) => async (dispatch) => {
    // "book" should be === { studentId: 5, genre: "racecar" };
    const { data: newBook } = await axios.post("/api/editor", book);
    if (!newBook || newBook === {}) {
        alert("Unable to create book");
        return false;
    } else {
        dispatch(setBook(newBook));
        return true;
    }
}

export const updateBook = (book) => async (dispatch) => {
    const { data: updatedBook } = await axios.put(`/api/editor/${book.id}`, book);
    if (!updatedBook || updatedBook === {}) {
        console.log("Error:", updatedBook);
        alert("Unable to edit book");
    } else {
        dispatch(_updateBook(updatedBook));
    }
}

export const deleteBook = (bookId) => async (dispatch) => {
    const { data } = await axios.delete(`/api/editor/${bookId}`);
    if (data) {
        dispatch(setBook({}));
    }
}

export const updatePage = (page) => async (dispatch) => {
    const { data: pages } = await axios.put(`/api/editor/${page.bookId}/pages/${page.id}`, page);
    if (pages) {
        dispatch(_updatePages(pages));
    }
}

export const deletePage = (page) => async (dispatch) => {
    const { data: book } = await axios.delete(`/api/editor/${page.bookId}/pages/${page.id}`);
    if (book) {
        dispatch(_updateBook(book));
    }
}
