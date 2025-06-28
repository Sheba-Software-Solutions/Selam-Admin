import React from "react";

export function Select({ value, onValueChange, children, className = "", ...props }) {
  return (
    <select
      value={value}
      onChange={e => onValueChange && onValueChange(e.target.value)}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = "", ...props }) {
  return <div className={`cursor-pointer ${className}`} {...props}>{children}</div>;
}

export function SelectValue({ placeholder, children, ...props }) {
  return <span {...props}>{children || placeholder}</span>;
}

export function SelectContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SelectItem({ value, children, ...props }) {
  return <option value={value} {...props}>{children}</option>;
} 