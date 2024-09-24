import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../store/tasksSlice"; // Redux actions
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog"; // Dialog (modal) from shadcn
import EditTaskModal from "@/components/EditTaskModal";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Filter from "@/components/Filter";
import { formatDate } from "@/helper/DateFormate";
import { useUser } from "@clerk/clerk-react";
import { fetchUser } from "@/store/usersSlice";
import Loader from "@/components/Loader";
const TaskDetails = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const {
    users: backEndUsers,
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

  const [selectedTask, setSelectedTask] = useState(null); // Task selected for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Control edit modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Control delete modal visibility

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
  }, [dispatch, query, backEndUsers]);
  useEffect(() => {
    if (!user) return;
    dispatch(fetchUser(user?.primaryEmailAddress?.emailAddress));
  }, [dispatch, user]);
  useEffect(() => {
    setQuery({ ...query, userId: backEndUsers?._id });
  }, [backEndUsers]);

  // Handle edit task (open modal and set task)
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Handle delete task (open confirmation modal)
  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDeleteTask = () => {
    dispatch(deleteTask(selectedTask._id)); // Dispatch delete action
    setIsDeleteModalOpen(false); // Close modal
  };
  const handleSelectChange = (name, value) => {
    setQuery({
      ...query,
      [name]: value,
    });
  };
  if (loading) return <Loader></Loader>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-auto max-w-7xl p-6 pb-36 bg-gray-50">
      {/* Filters */}
      <Filter handleSelectChange={handleSelectChange}></Filter>
      <Table>
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatDate(task.dueDate)}</TableCell>
              <TableCell
                className={`${
                  task.priority === "High"
                    ? "text-red-600"
                    : task.priority === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                } font-bold`}
              >
                {task.priority}
              </TableCell>
              <TableCell
                className={`${
                  task.status === "Pending"
                    ? "text-red-600"
                    : task.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-green-500"
                } font-bold`}
              >
                {task.status}
              </TableCell>
              <TableCell>
                <div className="flex justify-around items-center">
                  {/* Edit Button */}
                  <Button
                    onClick={() => handleEditClick(task)}
                    className="bg-lime-800 hover:bg-lime-700 flex justify-center items-center gap-4"
                  >
                    <span>Edit</span>
                    <FaRegEdit className="text-xl" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDeleteClick(task)}
                    className="bg-red-800 hover:bg-red-700 flex justify-center items-center gap-4"
                  >
                    <span>Delete</span>
                    <MdDelete className="text-2xl" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Task Modal */}
      {isEditModalOpen && selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={selectedTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteTaskModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteTask}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskDetails;
