import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(
  ({ children, className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-700",
      high: "bg-gradient-to-r from-error to-primary text-white",
      medium: "bg-gradient-to-r from-accent to-warning text-gray-800",
      low: "bg-gradient-to-r from-info to-secondary text-white",
      pending: "bg-gray-100 text-gray-700",
      "in-progress": "bg-gradient-to-r from-info to-secondary text-white",
      completed: "bg-gradient-to-r from-success to-secondary text-white",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;