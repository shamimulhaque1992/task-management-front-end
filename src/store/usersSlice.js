import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch a single user by email
export const fetchUser = createAsyncThunk("users/fetchUser", async (email) => {
  const response = await axios.get(
    `https://task-management-server-six.vercel.app/api/v1/user/${email}`
  );
  return response.data.data;
});

// Thunk to create a new user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser) => {
    const response = await axios.patch(
      "https://task-management-server-six.vercel.app/api/v1/user/create-user",
      newUser
    );
    return response.data.data; // Return the created user data
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // Add the new user to the list
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
