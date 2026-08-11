import React from "react";

const Input = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  required = false,
  error = "",
  name = "",
  autoComplete = undefined,
  textarea = false,
  rows = 3,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={id || name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
      ) : (
        <input
          id={id || name}
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
