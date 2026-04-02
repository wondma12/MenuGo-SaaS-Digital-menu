// components/ui/Button.jsx
import React from "react";

const variantStyles = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition duration-200 ${variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
