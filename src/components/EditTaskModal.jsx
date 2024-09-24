/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      // Format dueDate to YYYY-MM-DD
      const formattedDate = new Date(task.dueDate).toISOString().split("T")[0];
      setDueDate(formattedDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    // Dispatch the updateTask action
    dispatch(updateTask({ taskId: task._id, updatedTask }));

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Edit Task</DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Task Title */}
            <div>
              <label htmlFor="title" className="block font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full"
                required
              />
            </div>

            {/* Task Description */}
            <div>
              <label htmlFor="description" className="block font-medium">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full"
                required
              />
            </div>

            {/* Task Priority */}
            <div>
              <label htmlFor="priority" className="block font-medium">
                Priority
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Task Status */}
            <div>
              <label htmlFor="status" className="block font-medium">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block font-medium">
                Due Date
              </label>
              <Input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <Button
                type="submit"
                className="w-full"
              >
                Update Task
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
