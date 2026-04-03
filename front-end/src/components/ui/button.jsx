import React from "react";

const variantStyles = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const Button = ({ label, children, onClick, type = "button", variant = "primary", className = "" }) => {
  const styles = variantStyles[variant] ?? variantStyles.primary;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition duration-200 ${styles} ${className}`}
    >
      {label ?? children}
    </button>
  );
};

export default Button;