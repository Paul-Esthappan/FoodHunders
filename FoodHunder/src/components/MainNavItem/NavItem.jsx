import React from 'react'

const NavItem = ({type='',onClick='',icon='',spanLabel='',className=''}) => {
  return (
    <button
      type={type}
      className="inline-flex  items-center justify-center md:justify-start py-4 px-1 hover:bg-gray-50 dark:hover:bg-gray-800 group flex-row  "
      onClick={onClick}
      >
          {icon}
      <span className="hidden dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600 md:block md:text-gray-400 md:pl-1">{spanLabel}</span>
    </button>
  );
}

export default NavItem


