// import { createSlice } from "@reduxjs/toolkit";
// const axios = require("axios");

// // === current approach to user information: === //
// // TOKEN is stored in localStorage
// // USER data is in store (email, name, etc (not pw))

// const authSlice = createSlice({
//     name: "authSlice",
//     initialState: {},
//     reducers: {
//         setLoggedInUser: (state, action) => {
//             return action.payload;
//         },
//         logout: (state, action) => {
//             localStorage.removeItem("token");
//             return {};
//         },
//     }
// })

// export default authSlice.reducer;
// export const { setLoggedInUser, logout } = authSlice.actions;

// // verifies credentials, stores token in localStorage, logs in
// export const login = (credentials) => async (dispatch) => {
//     const { data: user } = await axios.post("/api/auth/login", credentials);
//     if (!user.username) {
//         alert("Could not find user with that email/username!");
//         return false;
//     } else if (!user.token) {
//         alert("Invalid login!");
//         return false;
//     } else {
//         dispatch(setLoggedInUser(user));
//         window.localStorage.setItem("token", user.token);
//         alert("Successfully logged in!");
//         return true;
//     }
// }

// // signup creates acct, generates token, and logs in
// export const signup = (credentials) => async (dispatch) => {
//     const { data: user } = await axios.post("/api/auth/signup", credentials);
//     if (user.error) {
//         alert(user.errorMessage);
//         return false;
//     } else {
//         dispatch(setLoggedInUser(user));
//         window.localStorage.setItem("token", user.token);
//         alert("Account successfully created!");
//         return true;
//     }
// }

// // verifies that stored token is valid, stores user data in store
// // if valid token returns 'true', else returns 'false'
// export const verifyToken = (token) => async (dispatch) => {
//     const { data: user } = await axios.get("/api/auth", {
//         headers: { authorization: token }
//     });
//     if (user?.email) {
//         dispatch(setLoggedInUser(user));
//         return true;
//     } else {
//         alert("Invalid token");
//         return false;
//     }
// }
