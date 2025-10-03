import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const TextArea = forwardRef(
  ({ className, label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white text-gray-900",
            "focus:border-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-20",
            "transition-colors duration-200 outline-none resize-none",
            "placeholder:text-gray-400",
            error && "border-error focus:border-error focus:ring-error",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;