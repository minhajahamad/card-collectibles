import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

const Modal = ({ onClose }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSendOtp = () => {
    setLoader(true);
    setTimeout(() => {
      setShowOtp(true);
      setLoader(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="flex p-5 w-[90%] h-[90vh] bg-white rounded-[22px] mx-auto relative z-50 shadow-[0_0_17px_0_#00000014]">
        <div className="w-[70%]">
          <img src="/Images/Modal-img.png" className="w-full h-full" />
        </div>
        <div className="w-[30%] flex flex-col gap-3 pl-10  ">
          <div className="font-poppins text-[36px]">
            <p className="font-semibold text-[36px] text-[#111111]">Lets Get</p>
            <p className="font-medium text-[36px] text-[#00A397]">Started!</p>
          </div>

          <div className="flex flex-col gap-5">
            <form className="font-montserrat flex flex-col gap-4">
              <div className="flex flex-col  ">
                <label className="font-medium text-[14px] text-[#111111]  ">
                  Full Name
                </label>
                <div className="flex   gap-3">
                  <input
                    className="w-[50%] p-2 text-[13px]  border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] "
                    placeholder="First Name"
                  />
                  <input
                    className="w-[50%] p-2  text-[13px] border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] "
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col  ">
                <label className="font-medium text-[14px] text-[#111111]  ">
                  Email
                </label>
                <input
                  className="w-[100%] p-2 text-[13px]  border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] "
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col  ">
                <label className="font-medium text-[14px] text-[#111111]  ">
                  Password
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    className="w-[100%] p-2 text-[13px]  border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] "
                    placeholder="Enter your password"
                  />
                  <input
                    className="w-[100%] p-2 text-[13px]  border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] "
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <div className="flex flex-col  ">
                <label className="font-medium text-[14px] text-[#111111]  ">
                  Phone Number
                </label>
                <div className="flex   gap-3">
                  <input className="w-[20%] p-2 text-[13px]  border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] " />
                  <input
                    className="w-[50%] p-2  text-[13px] border border-[#aeaeae] rounded-[8px] bg-white  focus:outline-none focus:border-[#424242] placeholder:text-[12px] "
                    placeholder="00000 0000"
                  />
                  <div
                    onClick={handleSendOtp}
                    className="bg-[#467EF8] w-[30%] rounded-[14px] flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200"
                  >
                    {loader ? (
                      <div className="transition-opacity duration-300 ease-in opacity-100 flex items-center justify-center">
                        <LineSpinner size={20} color="white" stroke="2" />
                      </div>
                    ) : (
                      <p className="font-semibold text-[11px] text-white transition-opacity duration-200">
                        Send OTP
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {/* Show OTP Section */}
            {showOtp && (
              <div className="flex flex-col gap-2 items-center font-inter">
                <p className="text-[14px] font-semibold">Enter OTP</p>
                <p className="text-[12px] text-gray-500">
                  We have sent an OTP to your mobile number
                </p>
                <div className="flex items-center justify-around gap-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <input
                        key={i}
                        className="w-[15%] border-2 border-[#e3e3e3] rounded-[12px] py-5 placeholder:text-center focus:outline-none focus:border-[#424242] text-center"
                        placeholder="-"
                      />
                    ))}
                </div>
                <div className="bg-[#467EF8] rounded-[12px] px-7 py-3 text-white cursor-pointer">
                  <p className="font-montserrat font-semibold text-[14px]">
                    Verify OTP
                  </p>
                </div>
                <div>
                  <p className="font-poppins text-[14px]">
                    Don't receive code?{' '}
                    <span className="text-[#6941C6] font-semibold cursor-pointer hover:text-[#9d80e1] transition-all duration-200 ease-in-out">
                      Resend OTP
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-[28px] text-[#666666] hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
          onClick={onClose}
        >
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default Modal;
