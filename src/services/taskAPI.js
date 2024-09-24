import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

export const fetchTasks = () => axios.get(`${BASE_URL}/task`);
export const createTask = (task) => axios.post(`${BASE_URL}/task/create-task`, task);
export const updateTask = (id, updates) => axios.put(`${BASE_URL}/task/${id}`, updates);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/task/${id}`);
