import React from "react";

const Input = ({
  label,
  placeholder = "",
  type = "text",
  id,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-sm">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-b border-gray-300 py-1 w-full focus:border-b-2 focus:border-pink-600 transition-colors focus:outline-none peer bg-inherit"
        />
        <label
          htmlFor={id}
          className="absolute left-0 -top-4 text-xs cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-pink-600 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
