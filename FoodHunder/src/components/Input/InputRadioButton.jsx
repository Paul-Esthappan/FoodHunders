import React from 'react'

const InputRadioButton = ({
  type = "",
  name = "",
  value = "",
  label = "",
  checked = "",
  onChange = "",
}) => {
  return (
    <div className="mb-4 flex justify-center items-center  ">
      {label && (
        <label
          className="block text-gray-800 text-sm font-bold mb-2 mt-2"
          htmlFor={name}
        >
          {label} :
        </label>
      )}

      <input
        type={type}
        id={value}
        name={name}
        value={value}
        checked={checked} // Add this line to set the checked state
        onChange={onChange}
        className="mr-2"
      />
    </div>
  );
};

export default InputRadioButton