import React from 'react'

const Input = (
  {
    label='',
    type = '',
    id = '',
    name = '',
    placeholder='',
    value = '',
    onChange = '',
    }
) => {
  return (
    <div className='mb-4'>
      {label && <label className='block text-gray-800 text-sm font-bold mb-2 mt-2' htmlFor={name}>{label} :</label>}

      <input
        className="w-60 shadow-md appearance-none border rounded  border-gray-900 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-lg "
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input