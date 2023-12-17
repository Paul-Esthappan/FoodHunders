import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUserAndToken: (state, action) => {
   const { user, token } = action.payload;
       

      if (user || token) {
        return {
          ...state,
          user,
          token,
        }
      }
         console.error('Invalid payload structure');
        return state
  
      } ,
    clearUserAndToken: (state) => {
      try {
        return {
          ...state,
          user: null,
          token: null,
        };
      } catch (error) {
        console.error('Error clearing user and token:', error);
        return state; 
      }
    },
  },
});

export const { setUserAndToken, clearUserAndToken } = authSlice.actions;
export default authSlice.reducer;
