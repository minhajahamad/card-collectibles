import React, { useState, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';
import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Modal = ({ onClose }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);

  const handleSendOtp = () => {
    setLoader(true);
    setTimeout(() => {
      setShowOtp(true);
      setLoader(false);
    }, 1500);
  };

  const otpRef = useRef([]);
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < otpRef.current.length - 1) {
        otpRef.current[index + 1]?.focus();
      }
    }
  };

  const inputRefs = useRef([]);
  const handleFormKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex p-5 w-[90%] h-[90vh] bg-white rounded-[22px] mx-auto relative z-50 shadow-[0_0_17px_0_#00000014]">
          <div className="w-[70%]">
            <img src="/Images/Modal-img.png" className="w-full h-full" />
          </div>

          <div className="w-[30%] flex flex-col justify-center gap-3 pl-10">
            <div className="font-poppins text-[36px]">
              <p className="font-semibold text-[#111111]">Lets Get</p>
              <p className="font-medium text-[#00A397]">Started!</p>
            </div>

            <div className="flex flex-col gap-5">
              <form className="font-montserrat flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#111111]">
                    Full Name
                  </label>
                  <div className="flex gap-3">
                    <input
                      ref={el => (inputRefs.current[0] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 0)}
                      className="w-[50%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="First Name"
                    />
                    <input
                      ref={el => (inputRefs.current[1] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 1)}
                      className="w-[50%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#111111]">
                    Email
                  </label>
                  <input
                    ref={el => (inputRefs.current[2] = el)}
                    onKeyDown={e => handleFormKeyDown(e, 2)}
                    className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#111111]">
                    Password
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      ref={el => (inputRefs.current[3] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 3)}
                      className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="Enter your password"
                    />
                    <input
                      ref={el => (inputRefs.current[4] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 4)}
                      className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#111111]">
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <input
                      ref={el => (inputRefs.current[5] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 5)}
                      className="w-[20%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                    />
                    <input
                      ref={el => (inputRefs.current[6] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 6)}
                      className="w-[50%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="00000 0000"
                    />
                    <div
                      onClick={handleSendOtp}
                      className="bg-[#467EF8] w-[30%] rounded-[14px] flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200"
                    >
                      {loader ? (
                        <div className="flex items-center justify-center">
                          <LineSpinner size={20} color="white" stroke="1.5" />
                        </div>
                      ) : (
                        <p className="font-semibold text-[11px] text-white">
                          Send OTP
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </form>

              {/* OTP Section */}
              <AnimatePresence>
                {showOtp && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex flex-col gap-2 items-center font-inter"
                  >
                    <p className="text-[16px] font-semibold">Enter OTP</p>
                    <p className="text-[12px] text-gray-500">
                      We have sent an OTP to your mobile number
                    </p>
                    <div className="flex items-center justify-around gap-3">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <input
                            key={i}
                            ref={el => (otpRef.current[i] = el)}
                            className="w-[15%] border-2 border-[#e3e3e3] rounded-[12px] py-5 placeholder:text-center focus:outline-none focus:border-[#424242] text-center"
                            placeholder="-"
                            onKeyDown={e => handleKeyDown(e, i)}
                            maxLength={1}
                          />
                        ))}
                    </div>
                    <div
                      onClick={() => {
                        setVerifyOtpLoader(true);
                        setTimeout(() => {
                          setVerifyOtpLoader(false);
                          navigate('/user/personal-details');
                        }, 1500);
                      }}
                      className="bg-[#467EF8] rounded-[12px] w-[40%] py-3 text-white cursor-pointer active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {verifyOtpLoader ? (
                        <Spiral size="20" color="white" speed={2} />
                      ) : (
                        <p className="font-montserrat font-semibold text-[14px]">
                          Verify OTP
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="font-poppins text-[14px]">
                        Don't receive code?{' '}
                        <span className="text-[#6941C6] font-semibold cursor-pointer hover:text-[#9d80e1] transition-all duration-200">
                          Resend OTP
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-[28px] text-[#666666] hover:text-black transition-all duration-200 cursor-pointer"
            onClick={onClose}
          >
            <IoCloseOutline />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
