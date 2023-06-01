import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    identify: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIdentify: (state, action) => {
            state.identify = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.identify = null;
        },
    },
});

export const { setUser, logout, setIdentify } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: any) => state.user.user;
export const selectIdentify = (state: any) => state.user.identify;
