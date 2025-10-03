import React from "react";
import { cn } from "@/utils/cn";

const PriorityDot = ({ priority, className }) => {
  const colors = {
    high: "bg-gradient-to-br from-error to-primary",
    medium: "bg-gradient-to-br from-accent to-warning",
    low: "bg-gradient-to-br from-info to-secondary",
  };

  return (
    <div
      className={cn(
        "w-2 h-2 rounded-full flex-shrink-0",
        colors[priority] || colors.low,
        className
      )}
    />
  );
};

export default PriorityDot;