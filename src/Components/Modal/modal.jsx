import React, { useState, useRef, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';
import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axios';
import { API_URL } from '../../services/api_url';

// Import Firebase OTP functions
import {
  sendOTP,
  verifyOTP,
  initializeRecaptcha,
  resetRecaptcha,
} from '../../services/firebase/firebase'; // Update this path

const Modal = ({ onClose }) => {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  // Add formData state
  const [formData, setFormData] = useState({
    full_name: '',
    last_name: '',
    email: '',
    password: '',
    reenter_password: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState({});

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    // Create reCAPTCHA container if it doesn't exist
    if (!document.getElementById('recaptcha-container')) {
      const recaptchaDiv = document.createElement('div');
      recaptchaDiv.id = 'recaptcha-container';
      recaptchaDiv.style.display = 'none'; // Hide the invisible reCAPTCHA
      document.body.appendChild(recaptchaDiv);
    }

    // Initialize reCAPTCHA
    initializeRecaptcha('recaptcha-container');

    // Cleanup on unmount
    return () => {
      resetRecaptcha();
      const recaptchaDiv = document.getElementById('recaptcha-container');
      if (recaptchaDiv) {
        recaptchaDiv.remove();
      }
    };
  }, []);

  // Common handleChange function
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSendOtp = async () => {
    // Validate phone number first
    if (!formData.phone_number) {
      setErrors(prev => ({
        ...prev,
        phone_number: 'Phone number is required.',
      }));
      return;
    }

    setLoader(true);
    setOtpError('');

    try {
      // Format phone number (assuming Indian numbers)
      let phoneNumber = formData.phone_number.replace(/\D/g, ''); // Remove non-digits
      if (phoneNumber.length === 10) {
        phoneNumber = '+91' + phoneNumber;
      } else if (!phoneNumber.startsWith('+91')) {
        phoneNumber = '+91' + phoneNumber;
      }

      const result = await sendOTP(phoneNumber);

      if (result.success) {
        setShowOtp(true);
        // Clear any previous errors
        setErrors(prev => ({ ...prev, phone_number: '' }));
      } else {
        setOtpError(result.error || 'Failed to send OTP');
        setErrors(prev => ({
          ...prev,
          phone_number: result.error || 'Failed to send OTP',
        }));
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('Failed to send OTP. Please try again.');
      setErrors(prev => ({
        ...prev,
        phone_number: 'Failed to send OTP. Please try again.',
      }));
    } finally {
      setLoader(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otpValues.join('');

    if (otpCode.length !== 6) {
      // Changed from 4 to 6
      setOtpError('Please enter complete OTP');
      return;
    }

    setVerifyOtpLoader(true);
    setOtpError('');

    try {
      const result = await verifyOTP(otpCode);

      if (result.success) {
        // OTP verified successfully, now register the user
        await handleSubmit(null, true); // Pass true to indicate OTP is verified
      } else {
        setOtpError(result.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Failed to verify OTP. Please try again.');
    } finally {
      setVerifyOtpLoader(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError('');
    setOtpValues(['', '', '', '', '', '']); // Changed to 6 empty strings

    // Clear OTP inputs
    otpRef.current.forEach(input => {
      if (input) input.value = '';
    });

    // Resend OTP
    await handleSendOtp();
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

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-focus next input
      if (value && index < otpRef.current.length - 1) {
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

  const handleSubmit = async (e, otpVerified = false) => {
    if (e) e.preventDefault();

    // If OTP is not verified yet, just send OTP
    if (!otpVerified) {
      // Validation
      const {
        full_name,
        last_name,
        email,
        password,
        reenter_password,
        phone_number,
      } = formData;
      const newErrors = {};
      if (!full_name) newErrors.full_name = 'First name is required.';
      if (!last_name) newErrors.last_name = 'Last name is required.';
      if (!email) newErrors.email = 'Email is required.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email))
        newErrors.email = 'Please enter a valid email address.';
      if (!password) newErrors.password = 'Password is required.';
      if (!reenter_password)
        newErrors.reenter_password = 'Confirm password is required.';
      if (password && reenter_password && password !== reenter_password)
        newErrors.reenter_password = 'Passwords do not match.';
      if (!phone_number) newErrors.phone_number = 'Phone number is required.';
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      // Send OTP first
      await handleSendOtp();
      return;
    }

    // If OTP is verified, proceed with registration
    try {
      const response = await axiosInstance.post(
        API_URL.REGISTER.REGISTER,
        formData
      );
      console.log(response);

      // Save data to localStorage
      const userData = {
        uuid: response?.data?.data?.uuid,
        full_name: formData.full_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        login: true,
      };

      // Save individual items to localStorage
      localStorage.setItem('uuid', response?.data?.data?.uuid || '');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('login', 'true');

      setFormData({
        full_name: '',
        last_name: '',
        email: '',
        password: '',
        reenter_password: '',
        phone_number: '',
      });

      navigate('/user/personal-details');
    } catch (err) {
      console.log(err);
      setOtpError('Registration failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex p-5 w-[110vh] h-[80vh] bg-white rounded-[22px] mx-auto relative z-50 shadow-[0_0_17px_0_#00000014] ">
          <div className="w-[50%]">
            <img src="/Images/Modal-img.png" className="w-full h-full" />
          </div>

          <div className="w-[50%] flex flex-col justify-center gap-2 pl-10">
            <div className="font-poppins text-[36px] leading-tight">
              <p className="font-semibold text-[#111111]">Lets Get</p>
              <p className="font-medium text-[#00A397]">Started!</p>
            </div>

            <div className="flex flex-col gap-5">
              <form
                className="font-montserrat flex flex-col gap-2"
                onSubmit={handleSubmit}
              >
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#111111]">
                    Full Name
                  </label>
                  <div className="flex gap-3">
                    <div className="w-[50%]">
                      <input
                        ref={el => (inputRefs.current[0] = el)}
                        onKeyDown={e => handleFormKeyDown(e, 0)}
                        className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                        placeholder="First Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                      />
                      {errors.full_name && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.full_name}
                        </span>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <input
                        ref={el => (inputRefs.current[1] = el)}
                        onKeyDown={e => handleFormKeyDown(e, 1)}
                        className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                      {errors.last_name && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.last_name}
                        </span>
                      )}
                    </div>
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </span>
                  )}
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
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </span>
                    )}
                    <input
                      ref={el => (inputRefs.current[4] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 4)}
                      className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="Confirm password"
                      type="password"
                      name="reenter_password"
                      value={formData.reenter_password}
                      onChange={handleChange}
                    />
                    {errors.reenter_password && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.reenter_password}
                      </span>
                    )}
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
                      placeholder="+91"
                      value="+91"
                      readOnly
                    />
                    <input
                      ref={el => (inputRefs.current[6] = el)}
                      onKeyDown={e => handleFormKeyDown(e, 6)}
                      className="w-[50%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                      placeholder="00000 0000"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      maxLength="10"
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
                  {errors.phone_number && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.phone_number}
                    </span>
                  )}
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

                    {otpError && (
                      <p className="text-red-500 text-xs text-center">
                        {otpError}
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-2">
                      {Array(6) // Changed from 4 to 6
                        .fill(0)
                        .map((_, i) => (
                          <input
                            key={i}
                            ref={el => (otpRef.current[i] = el)}
                            className="w-[12%] border-2 border-[#e3e3e3] rounded-[12px] py-3 placeholder:text-center focus:outline-none focus:border-[#424242] text-center " // Changed width from 15% to 12%
                            placeholder="-"
                            onKeyDown={e => handleKeyDown(e, i)}
                            onChange={e => handleOtpChange(e, i)}
                            maxLength={1}
                            type="text"
                            value={otpValues[i]}
                          />
                        ))}
                    </div>
                    <div
                      onClick={handleVerifyOtp}
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
                        <span
                          className="text-[#6941C6] font-semibold cursor-pointer hover:text-[#9d80e1] transition-all duration-200"
                          onClick={handleResendOtp}
                        >
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
