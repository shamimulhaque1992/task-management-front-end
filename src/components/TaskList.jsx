/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/tasksSlice";
import { Button } from "./ui/button";
import { formatDate } from "@/helper/DateFormate";

import Filter from "./Filter";
import CreateTaskModal from "./CreateTaskModal";
import { fetchUser } from "@/store/usersSlice";
import { useUser } from "@clerk/clerk-react";

const TaskList = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const {
    users: backEndUsers,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  console.log("backEndUsers", backEndUsers);
  const [query, setQuery] = useState({
    sortBy: "",
    sortOrder: "",
    priority: "",
    status: "",
    userId: backEndUsers?._id,
  });

  useEffect(() => {
    if (!query.userId) return;
    dispatch(
      fetchTasks({
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        priority: query.priority,
        status: query.status,
        userId: query.userId,
      })
    );
  }, [dispatch, query]);
  useEffect(() => {
    if (!user) return;
    dispatch(fetchUser(user?.primaryEmailAddress?.emailAddress));
  }, [dispatch, user, query.userId]);
  useEffect(() => {
    setQuery({ ...query, userId: backEndUsers?._id });
  }, [backEndUsers]);

  // Handler to update the query state
  const handleSelectChange = (name, value) => {
    setQuery({
      ...query,
      [name]: value,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-screen mx-auto p-4 overflow-y-scroll pb-36">
      <div className="flex flex-row w-12/12 justify-between items-center py-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
        </div>
        <div className="">
          <Button onClick={() => setIsCreateTaskModalOpen(true)}>
            Add Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Filter handleSelectChange={handleSelectChange}></Filter>

      <ul className="space-y-4 ">
        {tasks?.map((task) => (
          <li key={task._id} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-gray-500">Status: {task.status}</p>
            <p className="text-gray-500">Priority: {task.priority}</p>
            <p className="text-gray-500">
              Due Date: {formatDate(task.dueDate)}
            </p>
          </li>
        ))}
      </ul>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        backEndUsers={backEndUsers}
      />
    </div>
  );
};

export default TaskList;
