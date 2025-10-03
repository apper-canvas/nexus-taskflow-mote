import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(
  ({ className, checked, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
              checked
                ? "bg-gradient-to-br from-secondary to-success border-secondary"
                : "border-gray-300 bg-white group-hover:border-secondary",
              className
            )}
          >
            {checked && (
              <ApperIcon
                name="Check"
                size={14}
                className="text-white animate-[spin_0.3s_ease-in-out]"
              />
            )}
          </div>
        </div>
        {label && (
          <span className="text-sm text-gray-700 select-none">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;