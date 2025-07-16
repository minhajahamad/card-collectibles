import React from 'react';

const Registeration = () => {
  return (
    <div>
      <div className="w-[35%] h-[650px] shadow-[0_0_17px_0_#00000014] mx-auto mt-[6%] rounded-[12px] border border-purple-100 p-[20px] pl-[40px] flex flex-col gap-[15px] ">
        <p className="font-company  text-[40px] ">COMPANY</p>
        <p className="font-sans text-[32px] font-medium mt-[20px]">Sign Up</p>
        <form className="flex  flex-col gap-[10px]">
          <div className="flex flex-col gap-[5px]">
            <label>Full Name</label>
            <input
              className="w-[400px] h-10 border border-gray-300 rounded-sm pl-2"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label>Email Address</label>
            <input
              className="w-[400px] h-10 border border-gray-300 rounded-sm pl-2"
              placeholder="your@email.com"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label>Password</label>
            <input
              className="w-[400px] h-10 border border-gray-300 rounded-sm pl-2"
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label>Confirm Password</label>
            <input
              className="w-[400px] h-10 border border-gray-300 rounded-sm pl-2"
              placeholder="Confirm Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registeration;
