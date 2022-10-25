import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

// === current approach to user information: === //
// TOKEN is stored in localStorage
// USER data is in store (email, name, etc (not pw))

const authSlice = createSlice({
    name: "authSlice",
    initialState: {},
    reducers: {
        setLoggedInUser: (state, action) => {
            return action.payload;
        },
        logout: (state, action) => {
            localStorage.removeItem("token");
            return {};
        },
    }
})

export default authSlice.reducer;
export const { setLoggedInUser, logout } = authSlice.actions;

// verifies credentials, stores token in localStorage, logs in
export const login = (credentials) => async (dispatch) => {
    const { data: user } = await axios.post("/api/auth/login", credentials);
    if (!user.username) {
        alert("Could not find user with that email/username!");
        return {};
    } else if (!user.token) {
        alert("Invalid login!");
        return {};
    } else {
        dispatch(setLoggedInUser(user));
        window.localStorage.setItem("token", user.token);
        alert("Successfully logged in!");
        return user;
    }
}

// creates an account, generates token, and logs in
export const signup = (credentials) => async (dispatch) => {
    const { data: user } = await axios.post("/api/auth/signup", credentials);
    if (user.error) {
        alert(user.errorMessage);
        return {};
    } else if (credentials.type === "user") {
        dispatch(setLoggedInUser(user));
        window.localStorage.setItem("token", user.token);
        alert("Instructor account successfully created!");
        return user;
    } else {
        alert("Student account successfully created!");
        return user;
    }
}

// allows users to stay logged in when refreshing the page
export const verifyToken = (token) => async (dispatch) => {
    const { data: user } = await axios.get("/api/auth", {
        headers: { authorization: token }
    });
    console.log("VERIFY TOKEN", user);
    if (user?.email) {
        dispatch(setLoggedInUser(user));
        return true;
    } else {
        dispatch(setLoggedInUser(user));
        localStorage.removeItem("token");
        return false;
    }
}
