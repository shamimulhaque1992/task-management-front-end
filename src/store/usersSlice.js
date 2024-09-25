import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const env = import.meta.env.VITE_ENVIRONMENT;
let baseUrl = null;
if (env === "development") {
  baseUrl = "http://localhost:5000/";
}
if (env === "production") {
  baseUrl = "https://task-management-server-six.vercel.app/";
}

// Thunk to fetch a single user by email
export const fetchUser = createAsyncThunk("users/fetchUser", async (email) => {
  const response = await axios.get(`${baseUrl}api/v1/user/${email}`);
  return response.data.data;
});

// Thunk to create a new user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser) => {
    const response = await axios.patch(
      `${baseUrl}api/v1/user/create-user`,
      newUser
    );
    return response.data.data; // Return the created user data
  }
);

// Thunk to update user preferences
export const updateUserPreferences = createAsyncThunk(
  "users/updateUserPreferences",
  async (preferences) => {
    const response = await axios.patch(
      `${baseUrl}api/v1/user/preferences`, // Update this URL if necessary
      preferences
    );
    return response.data.data; // Return the updated user data
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: false,
  },
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
      })

      // Handle update user preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        // Update user preferences logic; here we assume the payload is the updated user data
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        state.success = true;
        if (index !== -1) {
          state.users[index] = updatedUser; // Update the user in the list
        }
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
