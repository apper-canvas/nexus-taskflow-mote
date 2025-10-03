import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white text-gray-900",
            "focus:border-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-20",
            "transition-colors duration-200 outline-none cursor-pointer",
            error && "border-error focus:border-error focus:ring-error",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;