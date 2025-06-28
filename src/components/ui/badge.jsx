import React from "react";

const VARIANTS = {
  default: "bg-blue-100 text-blue-700",
  secondary: "bg-gray-100 text-gray-700",
  outline: "border border-blue-500 text-blue-700 bg-white",
};

export const Badge = ({ className = "", variant = "default", ...props }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${VARIANTS[variant] || VARIANTS.default} ${className}`}
    {...props}
  />
); 