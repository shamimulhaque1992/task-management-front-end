/* eslint-disable react/prop-types */
// DeleteTaskModal.js
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteTaskModal = ({ isOpen, onClose, onConfirm, task }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Confirm Delete</DialogHeader>
        <p>Are you sure you want to delete this task?</p>
        <div className="flex flex-col items-start justify-start">
          <p className="flex flex-row gap-4">
            <span className="font-bold w-[70px]">Title: </span>
            {task.title}
          </p>
          <p className="flex flex-row gap-4">
            <span className="font-bold w-[70px]">Priority: </span>
            {task.priority}
          </p>
          <p className="flex flex-row gap-4">
            <span className="font-bold w-[70px]">Status: </span>
            {task.status}
          </p>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={onClose} className="bg-gray-400">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600">
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskModal;
