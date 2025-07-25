import React, { useState, useRef, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LineSpinner } from "ldrs/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import "ldrs/react/LineSpinner.css";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";
import { countryCodes } from "./country.js"; // Adjust path as needed

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { API_URL } from "../../services/api_url";

// Import Firebase OTP functions
import {
  sendOTP,
  verifyOTP,
  initializeRecaptcha,
  resetRecaptcha,
} from "../../services/firebase/firebaseApp.ts";

const Modal = ({ onClose, initialView = "login" }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const referralCode = searchParams.get('refferal-code');
  const referralCode = localStorage.getItem("referralCode");
  console.log(referralCode);

  const [showOtp, setShowOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [showCountryModal, setShowCountryModal] = useState(false);

  // Add formData state
  const [formData, setFormData] = useState({
    full_name: "",
    last_name: "",
    email: "",
    password: "",
    reenter_password: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [isOtpSending, setIsOtpSending] = useState(false); // Add this state
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const [isPhoneValidating, setIsPhoneValidating] = useState(false);
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);

  // Add state for login form
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);

  // State for Forgot Password
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordLoader, setForgotPasswordLoader] = useState(false);

  // Handle login input change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleForgotPasswordClick = () => {
    if (!loginData.email) {
      setLoginError("Please enter your email address first.");
      return;
    }
    setLoginError("");
    setShowForgotPassword(true);
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }));
    setForgotPasswordError("");
  };

  const handleEmailBlur = async (e) => {
    const email = e.target.value.trim();
    console.log(email);

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "" }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    setIsEmailValidating(true);
    try {
      const response = await axiosInstance.get(API_URL.VALIDATION.EMAIL, {
        params: { email },
      });

      console.log(response.data.data);
      console.log(email);

      if (response.data?.data?.length > 0) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } catch (err) {
      console.error("Email validation error:", err);
    } finally {
      setIsEmailValidating(false);
    }
  };

  const handlePhoneBlur = async (e) => {
    const phoneNumber = e.target.value.trim();
    if (!phoneNumber) {
      setErrors((prev) => ({ ...prev, phone_number: "" }));
      setIsPhoneAvailable(false);
      return;
    }

    // Use the full phone number from formData for validation
    const fullPhoneNumber = formData.phone_number;

    setIsPhoneValidating(true);
    try {
      const response = await axiosInstance.get(
        API_URL.VALIDATION.PHONE_NUMBER,
        {
          params: { phone_number: fullPhoneNumber }, // Send full number with country code
        }
      );

      if (response.data?.data?.length > 0) {
        setErrors((prev) => ({
          ...prev,
          phone_number: "This phone number is already registered.",
        }));
        setIsPhoneAvailable(false);
      } else {
        setErrors((prev) => ({ ...prev, phone_number: "" }));
        setIsPhoneAvailable(true);
      }
    } catch (err) {
      console.error("Phone validation error:", err);
      setIsPhoneAvailable(false);
    } finally {
      setIsPhoneValidating(false);
    }
  };

  const handleResetPassword = async () => {
    const { newPassword, confirmPassword } = forgotPasswordData;
    if (!newPassword || !confirmPassword) {
      setForgotPasswordError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotPasswordError("Passwords do not match.");
      return;
    }

    setForgotPasswordLoader(true);
    setForgotPasswordError("");

    try {
      // 1. Fetch user by email to get UUID
      const userResponse = await axiosInstance.get(API_URL.USER.GET_USER, {
        params: { email: loginData.email },
      });

      const users = userResponse.data?.data;
      if (!users || users.length === 0) {
        setForgotPasswordError("No account found with this email address.");
        setForgotPasswordLoader(false);
        return;
      }
      const user = users[0];
      const uuid = user.uuid;

      // 2. Patch the new password
      await axiosInstance.patch(API_URL.USER.PATCH_USER_UUID(uuid), {
        password: newPassword,
        reenter_password: confirmPassword,
      });

      // Success
      setForgotPasswordLoader(false);
      setShowForgotPassword(false);
      setLoginError("Password has been reset successfully. Please login.");
      setForgotPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setForgotPasswordError(
        err?.response?.data?.error ||
          "Failed to reset password. Please try again."
      );
      setForgotPasswordLoader(false);
    }
  };

  // Handle login submit
  const handleLogin = async () => {
    setLoginError("");

    if (!loginData.email || !loginData.password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    setLoginLoader(true);
    try {
      const response = await axiosInstance.post(API_URL.LOGIN.LOGIN, loginData);
      console.log(response);

      // Save user data to localStorage (customize as needed)
      const user = response?.data?.data;
      if (user?.uuid) {
        localStorage.setItem("uuid", user.uuid);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("login", "true");
        navigate("/user/profile");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (err) {
      setLoginError(
        err?.response?.data?.error ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoginLoader(false);
    }
  };

  // Initialize reCAPTCHA on component mount
  // Replace the existing reCAPTCHA useEffect with this
  // Replace the existing reCAPTCHA useEffect with this
  useEffect(() => {
    let isComponentMounted = true;
    let initTimeout; // Remove ': NodeJS.Timeout' type annotation

    const initRecaptcha = async () => {
      if (!isComponentMounted) return;

      try {
        // Clean up first
        await resetRecaptcha();

        if (!isComponentMounted) return;

        // Create container if needed
        let recaptchaDiv = document.getElementById("recaptcha-container");
        if (!recaptchaDiv) {
          recaptchaDiv = document.createElement("div");
          recaptchaDiv.id = "recaptcha-container";
          recaptchaDiv.style.position = "fixed";
          recaptchaDiv.style.top = "-1000px";
          recaptchaDiv.style.left = "-1000px";
          recaptchaDiv.style.width = "1px";
          recaptchaDiv.style.height = "1px";
          recaptchaDiv.style.zIndex = "-1";
          document.body.appendChild(recaptchaDiv);
        }

        // Wait before initializing to avoid race conditions
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (
          isComponentMounted &&
          !recaptchaDiv.hasAttribute("data-recaptcha-initialized")
        ) {
          await initializeRecaptcha("recaptcha-container");
        }
      } catch (error) {
        console.log("Failed to initialize reCAPTCHA on mount:", error);
      }
    };

    // Start initialization after a delay to ensure DOM is ready
    initTimeout = setTimeout(initRecaptcha, 100);

    // Cleanup function
    return () => {
      isComponentMounted = false;

      if (initTimeout) {
        clearTimeout(initTimeout);
      }

      // Clean up reCAPTCHA
      resetRecaptcha().then(() => {
        // Remove container after cleanup
        const recaptchaDiv = document.getElementById("recaptcha-container");
        if (recaptchaDiv) {
          recaptchaDiv.remove();
        }
      });
    };
  }, []);

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    // Enable scroll on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Common handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // Clean the input to only digits
      const cleanedValue = value.replace(/\D/g, "");
      // Format with country code for storage
      const formattedPhone = selectedCountryCode + cleanedValue;
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone, // Store with country code
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
      country.code.includes(countrySearchTerm) ||
      country.country.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  const handleSendOtp = async () => {
    // Prevent multiple simultaneous calls
    if (isOtpSending || loader) {
      console.log("OTP send already in progress");
      return;
    }

    // Your existing validation code stays the same...
    const {
      full_name,
      last_name,
      email,
      password,
      reenter_password,
      phone_number,
    } = formData;

    const newErrors = {};
    if (!full_name) newErrors.full_name = "First name is required.";
    if (!last_name) newErrors.last_name = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!password) newErrors.password = "Password is required.";
    if (!reenter_password)
      newErrors.reenter_password = "Confirm password is required.";
    if (password && reenter_password && password !== reenter_password)
      newErrors.reenter_password = "Passwords do not match.";
    if (!phone_number) newErrors.phone_number = "Phone number is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsOtpSending(true);
    setLoader(true);
    setOtpError("");

    try {
      // Use the already formatted phone number from formData
      const fullPhoneNumber = formData.phone_number;

      console.log("Attempting to send OTP to:", fullPhoneNumber);
      const result = await sendOTP(fullPhoneNumber);

      if (result.success) {
        setShowOtp(true);
        setErrors((prev) => ({ ...prev, phone_number: "" }));
        setShowVerifyOtp(true);
        console.log("OTP sent successfully, UI updated");
      } else {
        const errorMessage = result.error || "Failed to send OTP";
        console.error("OTP send failed:", errorMessage);
        setOtpError(errorMessage);
        setErrors((prev) => ({
          ...prev,
          phone_number: errorMessage,
        }));
      }
    } catch (error) {
      console.error("Error in handleSendOtp:", error);
      const errorMessage = "Failed to send OTP. Please try again.";
      setOtpError(errorMessage);
      setErrors((prev) => ({
        ...prev,
        phone_number: errorMessage,
      }));
    } finally {
      setLoader(false);
      setIsOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otpValues.join("");

    if (otpCode.length !== 6) {
      // Changed from 4 to 6
      setOtpError("Please enter complete OTP");
      return;
    }

    setVerifyOtpLoader(true);
    setOtpError("");

    try {
      const result = await verifyOTP(otpCode);

      if (result.success) {
        // OTP verified successfully, now register the user
        await handleSubmit(null, true); // Pass true to indicate OTP is verified
      } else {
        setOtpError(result.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Failed to verify OTP. Please try again.");
    } finally {
      setVerifyOtpLoader(false);
    }
  };

  const handleResendOtp = async () => {
    // Prevent multiple resend attempts
    if (isOtpSending || loader) {
      return;
    }

    console.log("Resending OTP...");

    setOtpError("");
    setOtpValues(["", "", "", "", "", ""]);

    // Clear OTP inputs
    otpRef.current.forEach((input) => {
      if (input) input.value = "";
    });

    // Clean up and resend
    await resetRecaptcha();

    // Wait before resending
    setTimeout(() => {
      handleSendOtp();
    }, 1000);
  };

  const otpRef = useRef([]);
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
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
    if (e.key === "Enter") {
      e.preventDefault();
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  const getPhoneNumberWithoutCountryCode = (fullPhoneNumber) => {
    if (!fullPhoneNumber) return "";
    // Remove the selected country code from the beginning
    if (fullPhoneNumber.startsWith(selectedCountryCode)) {
      return fullPhoneNumber.substring(selectedCountryCode.length);
    }
    return fullPhoneNumber;
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
      if (!full_name) newErrors.full_name = "First name is required.";
      if (!last_name) newErrors.last_name = "Last name is required.";
      if (!email) newErrors.email = "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email))
        newErrors.email = "Please enter a valid email address.";
      if (!password) newErrors.password = "Password is required.";
      if (!reenter_password)
        newErrors.reenter_password = "Confirm password is required.";
      if (password && reenter_password && password !== reenter_password)
        newErrors.reenter_password = "Passwords do not match.";
      if (!phone_number) newErrors.phone_number = "Phone number is required.";
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      // Send OTP first
      await handleSendOtp();
      return;
    }

    // If OTP is verified, proceed with registration
    try {
      let response;
      if (referralCode) {
        response = await axiosInstance.post(
          API_URL.REGISTER.REFFERAL_REGISTER(referralCode),
          formData
        );
        console.log("refferal");
      } else {
        response = await axiosInstance.post(
          API_URL.REGISTER.REGISTER,
          formData
        );
        console.log("normal");
      }
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
      localStorage.setItem("uuid", response?.data?.data?.uuid || "");
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("login", "true");

      setFormData({
        full_name: "",
        last_name: "",
        email: "",
        password: "",
        reenter_password: "",
        phone_number: "",
      });

      navigate("/user/personal-details");
    } catch (err) {
      console.log(err);
      setOtpError("Registration failed. Please try again.");
    }
  };

  // State for Login
  const [showSigUp, setShowSignUp] = useState(initialView === "signup");

  // Show Verify OTP
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".country-dropdown")) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="flex xl:p-5 w-[95vw] h-[85vh] sm:w-[90vw] sm:h-[80vh] md:h-[70vh] md:w-[70vw] lg:h-[60vh] lg:w-[60vw] xl:w-[60vw] xl:h-[80vh] bg-white rounded-[22px] mx-auto relative z-50 shadow-[0_0_17px_0_#00000014] overflow-hidden">
          <div className="w-[50%] hidden xl:block">
            <img src="/Images/Modal-img.png" className="w-full h-full " />
          </div>

          {/* SignUp Form */}

          {showSigUp ? (
            <div className="w-full xl:w-[50%] px-4 py-6 sm:px-6 sm:py-8 xl:px-5 xl:py-10 flex flex-col justify-center gap-2 xl:pl-10">
              {/* Conditionally render heading - only show when NOT in verify OTP mode */}
              {!showVerifyOtp && (
                <div className="font-poppins text-[28px] sm:text-[35px] xl:text-[42px] leading-tight">
                  <p className="font-semibold text-[#111111]">Lets Get</p>
                  <p className="font-medium text-[#00A397]">Started!</p>
                </div>
              )}

              <div className="flex flex-col gap-5">
                {/* OTP Section */}
                {showVerifyOtp ? (
                  <AnimatePresence>
                    {showOtp && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col gap-2 items-center font-inter"
                      >
                        <p className="text-[16px] font-semibold">Enter OTP</p>
                        <p className="text-[12px] text-[#475467]">
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
                                ref={(el) => (otpRef.current[i] = el)}
                                className="w-[12%] border-2 border-[#e3e3e3] rounded-[12px] py-3 placeholder:text-center focus:outline-none focus:border-[#424242] text-center " // Changed width from 15% to 12%
                                placeholder="-"
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onChange={(e) => handleOtpChange(e, i)}
                                maxLength={1}
                                type="text"
                                value={otpValues[i]}
                              />
                            ))}
                        </div>
                        <div
                          onClick={handleVerifyOtp}
                          className="bg-[#467EF8] rounded-[12px] w-[60%] sm:w-[50%] xl:w-[40%] py-3 text-white cursor-pointer active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
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
                            Don't receive code?{" "}
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
                ) : (
                  <form
                    className="font-montserrat flex flex-col gap-2 "
                    onSubmit={handleSubmit}
                  >
                    {/* Your existing form content remains the same */}
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label className="font-medium text-[14px] text-[#111111]">
                        Full Name
                      </label>
                      <div className="flex flex-col sm:flex-row xl:flex-row gap-3">
                        <div className="w-full sm:w-[50%]">
                          <input
                            ref={(el) => (inputRefs.current[0] = el)}
                            onKeyDown={(e) => handleFormKeyDown(e, 0)}
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
                        <div className="w-full sm:w-[50%]">
                          <input
                            ref={(el) => (inputRefs.current[1] = el)}
                            onKeyDown={(e) => handleFormKeyDown(e, 1)}
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
                      <div className="relative w-full sm:w-[100%] xl:w-[100%]">
                        <input
                          ref={(el) => (inputRefs.current[2] = el)}
                          onKeyDown={(e) => handleFormKeyDown(e, 2)}
                          className="w-full p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleEmailBlur}
                        />
                        {isEmailValidating && (
                          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                            <LineSpinner
                              size="16"
                              color="#424242"
                              stroke="1.5"
                            />
                          </div>
                        )}
                      </div>
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
                        <div className="relative">
                          <input
                            ref={(el) => (inputRefs.current[3] = el)}
                            onKeyDown={(e) => handleFormKeyDown(e, 3)}
                            className="w-full sm:w-[100%] xl:w-[100%] p-2 pr-10 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <div
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <IoEyeOffOutline />
                            ) : (
                              <IoEyeOutline />
                            )}
                          </div>
                        </div>

                        {errors.password && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.password}
                          </span>
                        )}
                        <div className="relative">
                          <input
                            ref={(el) => (inputRefs.current[4] = el)}
                            onKeyDown={(e) => handleFormKeyDown(e, 4)}
                            className="w-full p-2 pr-10 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                            placeholder="Confirm password"
                            type={showConfirmPassword ? "text" : "password"}
                            name="reenter_password"
                            value={formData.reenter_password}
                            onChange={handleChange}
                          />
                          <div
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <IoEyeOffOutline />
                            ) : (
                              <IoEyeOutline />
                            )}
                          </div>
                        </div>

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
                      <div className="flex sm:flex-row gap-1 items-center">
                        {/* Country Code Button */}
                        <div
                          className="w-[20%] sm:w-[25%] xl:w-[30%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white cursor-pointer flex items-center justify-center hover:border-[#424242] transition-colors duration-200"
                          onClick={() => setShowCountryModal(true)}
                        >
                          <span className="text-[#333] font-medium">
                            {selectedCountryCode}
                          </span>
                        </div>

                        {/* Phone Number Input */}
                        {/* <div className="relative flex-1"> */}
                        <input
                          ref={(el) => (inputRefs.current[6] = el)}
                          onKeyDown={(e) => handleFormKeyDown(e, 6)}
                          className="flex-1 sm:w-[90%] xl:w-[100%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px] transition-colors duration-200"
                          placeholder="Phone number"
                          name="phone_number"
                          value={getPhoneNumberWithoutCountryCode(
                            formData.phone_number
                          )} // Show only number part
                          onChange={handleChange}
                          type="tel"
                          onBlur={handlePhoneBlur}
                        />
                        {isPhoneValidating && (
                          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                            <LineSpinner
                              size="16"
                              color="#424242"
                              stroke="1.5"
                            />
                          </div>
                        )}
                        {/* </div> */}

                        {/* Send OTP Button */}
                        <div
                          onClick={
                            isOtpSending || !isPhoneAvailable
                              ? undefined
                              : handleSendOtp
                          }
                          className={`rounded-[9px] sm:w-[20%] xl:w-[20%] min-w-[80px] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm  ${
                            isOtpSending || !isPhoneAvailable
                              ? "bg-[#a5a5a5] cursor-not-allowed opacity-60"
                              : "bg-[#467EF8] hover:bg-[#3b6de8] active:scale-95"
                          }`}
                          disabled={isOtpSending || !isPhoneAvailable}
                          aria-disabled={isOtpSending || !isPhoneAvailable}
                        >
                          {loader ? (
                            <div className="flex items-center justify-center py-2">
                              <LineSpinner
                                size={20}
                                color="white"
                                stroke="1.5"
                              />
                            </div>
                          ) : (
                            <p className="font-semibold text-[11px] text-white py-2 px-2 text-center">
                              {isOtpSending ? "Sending..." : "Send OTP"}
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

                    {/* Country Code Selection Modal */}
                    {showCountryModal && (
                      <AnimatePresence>
                        <motion.div
                          className="fixed inset-0 z-[70] flex items-center justify-center backdrop-blur-sm bg-black/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => setShowCountryModal(false)}
                        >
                          <motion.div
                            className="bg-white rounded-[16px] shadow-2xl w-[95%] sm:w-[90%] max-w-[400px] h-[70vh] max-h-[500px] flex flex-col overflow-hidden mx-4"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                              <h3 className="text-[18px] font-semibold text-[#111111] font-poppins">
                                Select Country Code
                              </h3>
                              <button
                                onClick={() => setShowCountryModal(false)}
                                className="text-[#666] hover:text-[#111] transition-colors p-1"
                              >
                                <IoCloseOutline size={24} />
                              </button>
                            </div>

                            {/* Search Input */}
                            <div className="p-4 border-b border-[#f1f3f4]">
                              <input
                                type="text"
                                placeholder="Search country or code..."
                                className="w-full p-3 text-[14px] border border-[#d1d5db] rounded-[10px] focus:outline-none focus:border-[#467EF8] focus:ring-2 focus:ring-[#467EF8]/20 transition-all duration-200"
                                value={countrySearchTerm}
                                onChange={(e) =>
                                  setCountrySearchTerm(e.target.value)
                                }
                                autoFocus
                              />
                            </div>

                            {/* Countries List */}
                            <div className="flex-1 overflow-y-auto">
                              {filteredCountries.length > 0 ? (
                                <div className="p-2">
                                  {filteredCountries.map((country, index) => (
                                    <motion.div
                                      key={index}
                                      className="p-3 hover:bg-[#f8fafc] cursor-pointer rounded-[8px] flex items-center justify-between transition-colors duration-150 mx-2"
                                      whileHover={{
                                        backgroundColor: "#f1f5f9",
                                      }}
                                      onClick={() => {
                                        const currentPhoneWithoutCode =
                                          getPhoneNumberWithoutCountryCode(
                                            formData.phone_number
                                          );
                                        const newFormattedPhone =
                                          country.code +
                                          currentPhoneWithoutCode;

                                        setSelectedCountryCode(country.code);
                                        setFormData((prev) => ({
                                          ...prev,
                                          phone_number: newFormattedPhone,
                                        }));
                                        setShowCountryModal(false);
                                        setCountrySearchTerm("");
                                      }}
                                    >
                                      <div className="flex-1">
                                        <div className="text-[14px] font-medium text-[#374151] mb-1">
                                          {country.name}
                                        </div>
                                        <div className="text-[12px] text-[#6b7280]">
                                          {country.country}
                                        </div>
                                      </div>
                                      <div className="bg-[#f3f4f6] px-3 py-1 rounded-full">
                                        <span className="text-[#467EF8] font-semibold text-[13px]">
                                          {country.code}
                                        </span>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="text-center py-8">
                                    <div className="text-[48px] text-[#e5e7eb] mb-2">
                                      🔍
                                    </div>
                                    <p className="text-[#9ca3af] text-[14px]">
                                      No countries found
                                    </p>
                                    <p className="text-[#d1d5db] text-[12px] mt-1">
                                      Try searching with a different term
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-[#f1f3f4] bg-[#fafbfc]">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setShowCountryModal(false);
                                    setCountrySearchTerm("");
                                  }}
                                  className="flex-1 py-2 px-4 border border-[#d1d5db] rounded-[8px] text-[#374151] text-[14px] font-medium hover:bg-[#f9fafb] transition-colors duration-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                    <div className="mt-1">
                      <p className="font-poppins text-[14px]">
                        Already have an account?{" "}
                        <span
                          onClick={() => setShowSignUp(false)}
                          className="text-[#6941C6] font-semibold cursor-pointer hover:text-[#9d80e1] transition-all duration-200"
                        >
                          Login
                        </span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            // Login Form
            <div className="w-full xl:w-[50%] px-4 py-6 sm:px-6 sm:py-8 xl:py-10 flex flex-col justify-center gap-5 xl:px-10 xl:pl-10">
              {showForgotPassword ? (
                <div className=" flex flex-col items-center justify-center">
                  <div className="font-poppins text-[28px] sm:text-[35px] xl:text-[42px] leading-tight">
                    <p className="font-semibold text-[#111111]">
                      Reset Password
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-sm text-gray-600 mb-4">
                      Enter a new password for {loginData.email}
                    </p>
                    <form
                      className="flex flex-col gap-5"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="flex flex-col">
                        <label className="font-medium text-[14px] text-[#111111]">
                          New Password
                        </label>
                        <input
                          className="w-full sm:w-[95%] xl:w-[90%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                          placeholder="Enter your new password"
                          type="password"
                          name="newPassword"
                          value={forgotPasswordData.newPassword}
                          onChange={handleForgotPasswordChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium text-[14px] text-[#111111]">
                          Confirm New Password
                        </label>
                        <input
                          className="w-full sm:w-[95%] xl:w-[90%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                          placeholder="Confirm your new password"
                          type="password"
                          name="confirmPassword"
                          value={forgotPasswordData.confirmPassword}
                          onChange={handleForgotPasswordChange}
                        />
                      </div>
                    </form>
                    {forgotPasswordError && (
                      <div className="text-red-500 text-xs mt-1 w-[90%]">
                        {forgotPasswordError}
                      </div>
                    )}
                    <div
                      className="bg-[#00A397] text-white font-semibold shadow-lg text-[16px] rounded-[8px] active:scale-95 transition-all duration-300 ease-in-out w-fit py-2 px-10 cursor-pointer mx-auto mt-5 flex items-center justify-center gap-2"
                      onClick={handleResetPassword}
                    >
                      {forgotPasswordLoader ? (
                        <LineSpinner size={20} color="white" stroke="1.5" />
                      ) : (
                        <p>Reset Password</p>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <span
                        onClick={() => setShowForgotPassword(false)}
                        className="text-[#6941C6] font-semibold cursor-pointer hover:text-[#9d80e1] transition-all duration-200 text-[14px]"
                      >
                        Back to Login
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-poppins text-[35px] xl:text-[42px] leading-tight">
                    <p className="font-semibold text-[#111111]">
                      Start
                      <span className="font-medium text-[#00A397]">
                        {" "}
                        Collecting
                      </span>
                    </p>
                    <p className="font-semibold text-[#111111]">With Us!</p>
                  </div>
                  <div className="flex flex-col ">
                    <form
                      className="flex flex-col gap-5  "
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="flex flex-col ">
                        <label className="font-medium text-[14px] text-[#111111]">
                          Email
                        </label>
                        <input
                          onKeyDown={(e) => handleFormKeyDown(e, 2)}
                          className="w-full sm:w-[95%] xl:w-[90%] p-2 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                          placeholder="Enter your email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium text-[14px] text-[#111111]">
                          Password
                        </label>
                        <div className="flex flex-col gap-2">
                          <div className="relative w-full sm:w-[95%] xl:w-[90%]">
                            <input
                              onKeyDown={(e) => handleFormKeyDown(e, 3)}
                              className="w-full p-2 pr-10 text-[13px] border border-[#aeaeae] rounded-[8px] bg-white focus:outline-none focus:border-[#424242] placeholder:text-[12px]"
                              placeholder="Enter your password"
                              value={loginData.password}
                              type={showLoginPassword ? "text" : "password"}
                              name="password"
                              onChange={handleLoginChange}
                            />
                            <div
                              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                              onClick={() =>
                                setShowLoginPassword(!showLoginPassword)
                              }
                            >
                              {showLoginPassword ? (
                                <IoEyeOffOutline />
                              ) : (
                                <IoEyeOutline />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {loginError && (
                      <div className="text-red-500 text-xs mt-1 w-[90%]">
                        {loginError}
                      </div>
                    )}
                    {/* <div
                      className="text-[13px]  cursor-pointer text-[#00A397] text-right w-[90%] hover:text-[#3c8984] "
                      onClick={handleForgotPasswordClick}
                    >
                      <p>Forgot Password?</p>
                    </div> */}

                    <div
                      className="bg-[#00A397] text-white font-semibold shadow-lg text-[16px] rounded-[8px] active:scale-95 transition-all duration-300 ease-in-out w-fit py-2 px-12 sm:px-16 xl:px-20 cursor-pointer mx-auto mt-5 flex items-center justify-center gap-2"
                      onClick={handleLogin}
                    >
                      {loginLoader ? (
                        <LineSpinner size={20} color="white" stroke="1.5" />
                      ) : (
                        <p>Sign In</p>
                      )}
                    </div>

                    <div className="mt-10 text-center">
                      <p className="font-poppins text-[14px]">
                        Don't have an account yet?{" "}
                        <span
                          onClick={() => setShowSignUp(true)}
                          className="text-[#6941C6] font-semibold cursor-pointer hover:text-[#9d80e1] transition-all duration-200"
                        >
                          SignUp
                        </span>
                      </p>
                    </div>
                    <div className="text-center mt-3 text-[12px] text-[#475467]">
                      <p>
                        By signing up, you agree to the <u>Terms of Service</u>{" "}
                        and <u>Privacy Policy</u>, including <u>cookie use</u>.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

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
