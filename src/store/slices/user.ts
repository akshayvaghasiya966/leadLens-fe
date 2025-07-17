import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id:'',
    name: '',
    email: '',
    avatar:'',
    phone: '',
    role: '',
    token:'',
};

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            // Update the entire state with the new profile data
            const {_id, name, avatar, email, phone, role,token} = action.payload;
            state._id = _id || state._id;
            state.name = name || state.name;
            state.email = email || state.email;
            state.avatar = avatar || state.avatar;
            state.phone = phone || state.phone;
            state.role = role || state.role;
            state.token=token !== undefined ? token : state.token;
        },
        resetProfile: () => initialState,  // Reset to the initial state
    },
});

export const { setProfile, resetProfile } = userSlice.actions;
export default userSlice.reducer;
