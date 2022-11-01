import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {}
}

export const UserLogin = createSlice({
    initialState,
    name: 'UserProfile',
    reducers: {
        userData: (state = initialState, action) => {
            state.userData = action.payload
        },
        logout: (state = initialState,action) => {
            state.userData = {}
        }
    },
})

export const { userData, logout } = UserLogin.actions

export default UserLogin.reducer