import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gradient-to-r from-primary to-[#FF8787] text-white hover:shadow-lg hover:scale-[1.02]",
      secondary: "bg-gradient-to-r from-secondary to-[#5FD9D0] text-white hover:shadow-lg hover:scale-[1.02]",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-gray-700 hover:bg-gray-100",
      danger: "bg-gradient-to-r from-error to-warning text-white hover:shadow-lg hover:scale-[1.02]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;