import React from "react";
import { AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, categoryColors }) => {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            categoryColor={categoryColors[task.category]}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;