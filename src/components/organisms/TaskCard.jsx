import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import PriorityDot from "@/components/molecules/PriorityDot";
import CategoryTag from "@/components/molecules/CategoryTag";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, categoryColor }) => {
  const isCompleted = task.status === "completed";
  const isOverdue = new Date(task.dueDate) < new Date() && !isCompleted;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isCompleted ? 0.7 : 1, y: 0, scale: isCompleted ? 0.98 : 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={isCompleted}
            onChange={() => onToggleComplete(task)}
          />
        </div>

        <PriorityDot priority={task.priority} className="mt-2" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className={`text-lg font-semibold text-gray-900 ${
                isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-2"
              >
                <ApperIcon name="Edit2" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task)}
                className="p-2 text-error hover:bg-error hover:bg-opacity-10"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          {task.description && (
            <p
              className={`text-gray-600 mb-3 line-clamp-2 ${
                isCompleted ? "text-gray-400" : ""
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={task.status}>{task.status.replace("-", " ")}</Badge>
            <Badge variant={task.priority}>{task.priority}</Badge>
            {task.category && categoryColor && (
              <CategoryTag category={task.category} color={categoryColor} />
            )}
            <div
              className={`flex items-center gap-1 text-sm ${
                isOverdue ? "text-error font-medium" : "text-gray-500"
              }`}
            >
              <ApperIcon name="Calendar" size={14} />
              <span>{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
              {isOverdue && (
                <span className="ml-1 text-xs">(Overdue)</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;