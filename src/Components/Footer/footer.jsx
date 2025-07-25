import React from 'react';

const Footer = () => {
  return (
    <div className="overflow-hidden w-full flex flex-col xl:flex-row   justify-between bg-[#010816] font-raleway py-5 px-5 xl:py-15 xl:px-[10%]">
      <div className="w-full  xl:w-full  flex flex-col items-center   xl:items-start gap-3 ">
        <img src="/Images/logo.png " className="w-[158px] h-[70px]" />
        <p className="text-[15px] font-medium text-[#9BA3AE] text-center xl:text-start ">
          The premier platform for trading cards, comics, and collectibles.{' '}
          <br className="hidden xl:block" />
          Join thousands of sellers building their business with us.{' '}
          <br className="hidden md:block" />
          <span className="text-[#7E7E7E] text-[14px] hidden xl:block">
            © 2025 Collected Company. All rights reserved.
          </span>
        </p>
      </div>
      {/* <div className=" w-full flex justify-between xl:justify-end xl:gap-30  px-10 py-5 md:px-30 lg:px-50 xl:py-0 xl:px-0 ">
        <div className="flex flex-col gap-2 text-[15px] font-medium text-[#9BA3AE]  xl:w-[20%]   ">
          <p className="text-white text-[18px] font-extrabold ">Platform</p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer">
            How It Works?
          </p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            Pricing
          </p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            Features
          </p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            support
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[15px] font-medium text-[#9BA3AE] xl:w-[22%] ">
          <p className="text-white text-[18px] font-extrabold ">Company</p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            About
          </p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            Contact
          </p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            Privacy Policy
          </p>
          <p className="hover:text-white hover:ml-1 transition-all duration-200 ease-initial cursor-pointer ">
            Terms of Service
          </p>
        </div>
      </div> */}

      <span className="text-[#7E7E7E] text-[14px] xl:hidden text-center mt-5 ">
        © 2025 Collected Company. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
