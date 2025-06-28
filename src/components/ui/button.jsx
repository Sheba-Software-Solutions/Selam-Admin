import React from "react";

const VARIANTS = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
};

const SIZES = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = React.forwardRef(
  (
    { className = "", variant = "default", size = "md", ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={`rounded transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${VARIANTS[variant] || VARIANTS.default} ${SIZES[size] || SIZES.md} ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button"; 