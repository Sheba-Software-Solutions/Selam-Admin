import React from "react";

export function Card({ className = "", ...props }) {
  return <div className={`rounded-lg border bg-white shadow ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`p-4 border-b bg-gray-50 rounded-t-lg ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-4 ${className}`} {...props} />;
} 