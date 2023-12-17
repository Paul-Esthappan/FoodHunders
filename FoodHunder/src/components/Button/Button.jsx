import React from 'react'

const Button = ({ label = "", className = "", type = "", disabled = "" }) => {
  return (
    <button
      type={type}
      className={`bg-green-500 rounded hover:bg-green-700 text-white font-bold py-2 px-2 ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button