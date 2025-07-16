import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

const NavBar = () => {
  return (
    <nav className="w-full h-[70px] lg:h-[85px]   flex items-center bg-[#09778E]  justify-between px-4 md:px-15 lg:px-20 overflow-hidden ">
      <div className="  cursor-pointer ">
        <img
          src="/Images/logo.png"
          className="  object-cover w-[115px] h-[50px] lg:w-[158px] lg:h-[70px] "
        />
      </div>

      <div className=" lg:w-[105px] xl:w-[115px] h-full xl:flex items-center justify-between hidden ">
        <div className=" rounded-full border-2 border-white">
          <img
            src="/Images/username.png"
            className="rounded-full  object-top object-cover cursor-pointer w-[25px] h-[25px] md:w-[30px] md:h-[30px]   "
          />
        </div>
        <div className="flex flex-col text-white ">
          <p>
            <i> Hello !</i>
          </p>
          <p className=" text-[14px] xl:text-[16px] font-username">Username</p>
        </div>
      </div>
      <div className="xl:hidden text-white text-[24px] lg:text-[30px]">
        <RxHamburgerMenu />
      </div>
    </nav>
  );
};

export default NavBar;
