import React from "react";
import { cn } from "@/utils/cn";

const CategoryTag = ({ category, color, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {category}
    </span>
  );
};

export default CategoryTag;