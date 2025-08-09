import React from 'react';

const Footer = () => {
  return (
    <div className="overflow-hidden w-full flex flex-col xl:flex-row   justify-between bg-[#010816] font-raleway py-5 px-5 xl:py-15 xl:px-[10%]">
      <div className="w-full  xl:w-full  flex flex-col items-center   xl:items-start gap-3 ">
        <img src="/Images/logo.png " className="w-[158px] h-[70px]" />
        <p className="text-[15px] font-medium text-[#9BA3AE] text-center xl:text-start ">
          The premier platform for trading cards, comics, and collectibles.{" "}
          <br className="hidden xl:block" />
          Join thousands of sellers building their business with us.{" "}
          <br className="hidden md:block" />
        </p>
        {/* Social icons */}
        <div className="flex items-center gap-4 mt-1">
          <a
            href="https://www.instagram.com/collected.company"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#9BA3AE] hover:text-white transition-colors"
          >
            {/* Instagram SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/share/1Ahv4nGTZ7/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#9BA3AE] hover:text-white transition-colors"
          >
            {/* Facebook SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.07 5.66 21.2 10.44 22v-6.99H7.9v-2.95h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.95h-2.34V22C18.34 21.2 22 17.07 22 12.06z" />
            </svg>
          </a>
        </div>
        <span className="text-[#7E7E7E] text-[14px] hidden xl:block">
          © 2025 Collected Company. All rights reserved.
        </span>
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

      <div>

      </div>

      <span className="text-[#7E7E7E] text-[14px] xl:hidden text-center mt-5 ">
        © 2025 Collected Company. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
