import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

// === current approach to user information: === //
// TOKEN is stored in localStorage
// USER data is in store (email, name, etc (not pw))

const authSlice = createSlice({
    name: "authSlice",
    initialState: { user: {} },
    reducers: {
        setLoggedInUser: (state, action) => {
            state.user = action.payload;
            return state;
        },
        logout: (state, action) => {
            state.user = {};
            return state;
        },
    }
})

export default authSlice.reducer;
export const { setLoggedInUser, logout } = authSlice.actions;

// verifies credentials, stores token in localStorage, logs in
export const login = (credentials) => async (dispatch) => {
    const { data: user } = await axios.post("/api/auth/login", credentials);
    console.log(user);
    if (!user.username) {
        alert("Could not find user with that email/username!");
    } else if (!user.token) {
        alert("Invalid login!");
    } else {
        dispatch(setLoggedInUser(user));
        window.localStorage.setItem("token", user.token);
        alert("Successfully logged in!");
    }
}

// signup creates acct, generates token, and logs in
export const signup = (credentials) => async (dispatch) => {
    const { data: token } = await axios.post("/api/auth/signup", credentials);
    console.log("Signup data:");
    console.dir(token);

    await dispatch(verifyToken(token));
    localStorage.setItem("token", token);
    console.log("Set token as:", token);
}

// verifies that stored token is valid
export const verifyToken = (token) => async (dispatch) => {
    const { data: user } = await axios.get("/api/auth", {
        headers: { authorization: token }
    });
    dispatch(setLoggedInUser(user));
}
