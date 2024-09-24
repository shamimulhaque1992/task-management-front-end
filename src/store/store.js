import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export default store;
