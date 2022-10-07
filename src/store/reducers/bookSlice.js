import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

const bookSlice = createSlice({
    name: 'bookList',
    initialState: {
        books: [],
        bookData: {},
        status: 'idle',
        error: null,
        filter: null,
    },
    reducers: {
        getBookList: (state, action) => {
            state.bookList = action.payload;
            return state;
        },
        getBook: (state, action) => {
			state.bookData = action.payload;
			return state;
        },
        addBook: (state, action) => {
            state.bookList.push(action.payload);
            return state;
        },
        deleteBook: (state, action) => {
            state.bookList = state.bookList.filter(
				(book) => book.id != action.payload.id
			);
			return state;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    },
    extraReducers(builder) {
		builder
			.addCase(fetchBooks.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.books = action.payload;
				state.filter = 'All';
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			})
			.addCase(fetchBookData.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchBookData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.singleBook = action.payload;
			})
			.addCase(fetchBookData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			});
        },
});

export default bookSlice.reducer;

export const {
    getBookList,
    setErrorMsg,
    getBook,
    addBook,
    deleteBook,
} = bookSlice.actions;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
	try {
		const { data } = await axios.get('/api/books');
		return data;
	} catch (e) {
		console.log(e);
	}
});

export const fetchBookData = createAsyncThunk('/books/fetchBookData', async (id) => {
    try {
        const { data } = await axios.get(`/api/books/${id}`);
        return data;
    } catch (e) {
        console.log(e);
    }
})

