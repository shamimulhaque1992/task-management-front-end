import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for async API calls

// Fetch tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ sortBy, sortOrder, priority, status, userId }) => {
    if (!userId) return;
    const response = await axios.get(
      `http://localhost:5000/api/v1/task?sortBy=${sortBy}&sortOrder=${sortOrder}&priority=${priority}&status=${status}&userId=${userId}`
    );
    return response.data.data;
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/task/create-task",
      newTask
    );
    return response.data.data;
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedTask }) => {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/task/${taskId}`,
      updatedTask
    );
    return response.data.data;
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(`http://localhost:5000/api/v1/task/${taskId}`);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Add the new task to the list of tasks
      })
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === updatedTask._id
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
