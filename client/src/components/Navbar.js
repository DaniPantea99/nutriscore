import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BsFillArrowLeftCircleFill,
  BsFillGrid1X2Fill,
  BsPersonCircle,
  BsGearFill,
} from 'react-icons/bs';

function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: '/',
      name: 'dashboard',
      icon: <BsFillGrid1X2Fill />,
    },
    {
      path: '/user',
      name: 'user',
      icon: <BsPersonCircle />,
    },
    {
      path: '/settings',
      name: 'settings',
      icon: <BsGearFill />,
    },
  ];

  return (
    <div className="flex h-full grow dark:text-gray-100 dark:bg-slate-900">
      <div
        className={`flex flex-col bg-white transition-all duration-300 w-20 dark:text-gray-100 dark:bg-slate-800 ${
          isOpen && 'w-56'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-8 mb-2 h-28">
          <img
            className={`w-32 ${isOpen ? 'block' : 'hidden'}`}
            src={`./images/bon-appetit-bistro-logo.png`}
            alt="restaurant-logo"
          />

          <div className="flex justify-center text-3xl">
            <BsFillArrowLeftCircleFill
              onClick={toggleOpen}
              className={`transition-all duration-500 ml-2 text-blue-900 dark:text-blue-300 cursor-pointer hover:text-opacity-70 active:text-opacity-100 ${
                !isOpen && 'rotate-180'
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-2 overflow-y-auto no-scrollbar">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => {
                return `text-white flex p-2 rounded-lg transition-all duration-500 h-16 items-center
                  ${
                    isActive
                      ? ' text-white bg-gradient-to-t from-blue-400 to-blue-600 hover:bg-gradient-to-t hover:from-blue-400 hover:to-blue-400'
                      : 'text-blue-800 hover:bg-blue-200 dark:text-blue-300'
                  } 
                  ${isOpen ? 'justify-left' : 'justify-center'}
                `;
              }}
            >
              <div className="text-2xl">{item.icon}</div>
              <div
                className="ml-3 text-xl capitalize"
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className="overflow-auto grow">{children}</main>
    </div>
  );
}

export default Navbar;
