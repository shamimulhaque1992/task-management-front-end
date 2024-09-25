/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "@/helper/DateFormate";
import { fetchUser } from "@/store/usersSlice";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { fetchTasks } from "@/store/tasksSlice";
import { Button } from "@/components/ui/button";
import Filter from "@/components/Filter";
import CreateTaskModal from "@/components/CreateTaskModal";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const { tasks, loading, error, createLoading, success } = useSelector(
    (state) => state.tasks
  );
  const {
    user: backEndUsers,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
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
    if (!user?.primaryEmailAddress?.emailAddress) return;
    dispatch(fetchUser(user?.primaryEmailAddress?.emailAddress));
  }, [dispatch, user]);

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

  // Memoizing the tasks based on query changes
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks.filter((task) => {
      return (
        (query.priority ? task.priority === query.priority : true) &&
        (query.status ? task.status === query.status : true)
      );
    });
  }, [tasks, query.priority, query.status]);

  if (loading || createLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-auto max-w-7xl p-6 pb-36 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">All Tasks</h2>
        <Button
          className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-indigo-700 transition-all"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Filter handleSelectChange={handleSelectChange} />
      </div>

      {/* Task List */}
      <ul className="space-y-6">
        {filteredTasks?.map((task) => {
          const getStatusStyle = (status) => {
            if (status === "In Progress")
              return "bg-yellow-100 text-yellow-600";
            if (status === "Pending") return "bg-red-100 text-red-600";
            if (status === "Completed") return "bg-green-100 text-green-600";
            return "bg-gray-100 text-gray-600";
          };

          const getPriorityStyle = (priority) => {
            if (priority === "High") return "bg-red-100 text-red-600";
            if (priority === "Medium") return "bg-yellow-100 text-yellow-600";
            if (priority === "Low") return "bg-green-100 text-green-600";
            return "bg-gray-100 text-gray-600";
          };

          return (
            <li
              key={task._id}
              className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  {task.title}
                </h3>
                {/* Priority with dynamic color */}
                <span
                  className={`text-sm font-medium py-1 px-3 rounded-full ${getPriorityStyle(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-600 mt-2 mb-4">{task.description}</p>

              <div className="flex justify-between items-center text-gray-500 text-sm">
                {/* Status with dynamic color */}
                <p className="flex items-center">
                  <span className="font-medium text-gray-700">Status: </span>
                  <span
                    className={`ml-2 py-1 px-3 rounded-full ${getStatusStyle(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </p>

                {/* Due Date */}
                <p>
                  <span className="font-medium text-gray-700">Due Date: </span>
                  {formatDate(task.dueDate)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        backEndUsers={backEndUsers}
      />
    </div>
  );
};

export default Dashboard;
