/* eslint-disable react/prop-types */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Filter = ({ handleSelectChange, theme }) => {
  return (
    <div className="flex gap-4 mb-6">
      {/* Sort by */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Sort By:</label>
        <Select onValueChange={(value) => handleSelectChange("sortBy", value)}>
          <SelectTrigger className={`${theme === "dark" ? "text-black" : ""}`}>
            <SelectValue placeholder="Select Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort order */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Sort Order:</label>
        <Select
          onValueChange={(value) => handleSelectChange("sortOrder", value)}
        >
          <SelectTrigger className={`${theme === "dark" ? "text-black" : ""}`}>
            <SelectValue placeholder="Select Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Priority:</label>
        <Select
          onValueChange={(value) => handleSelectChange("priority", value)}
        >
          <SelectTrigger className={`${theme === "dark" ? "text-black" : ""}`}>
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Priority filter */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Status:</label>
        <Select onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger className={`${theme === "dark" ? "text-black" : ""}`}>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
