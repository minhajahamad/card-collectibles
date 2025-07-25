import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { API_URL } from "../../services/api_url";

const PersonalDetailForm = ({
  onNext,
  addressData,
  setAddressData,
  imagePreview,
  setImagePreview,
}) => {
  const [user, setUser] = useState({});
  const [emailVerificationStatus, setEmailVerificationStatus] = useState({
    isVerified: false,
    isSending: false,
    isRefreshing: false, // Add this line
    message: "",
    isError: false,
    isTempMessage: false,
  });
  const uuid = localStorage.getItem("uuid");
  const [localErrors, setLocalErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [tempMessage, setTempMessage] = useState("");

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(
        API_URL.USER.GET_USER_UUID(uuid)
      );
      console.log(response);
      setUser(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddress = () => {
    try {
      const response = axiosInstance.get(API_URL.ADDRESS.GET_ADDRESS);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // Check email verification status on component mount
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const response = await axiosInstance.get(
          API_URL.EMAIL_LOGIN.GET_EMAIL_VERIFIED,
          {
            params: { email: user.email },
          }
        );
        // Check the email_verified key from response
        if (response.data.email_verified === true) {
          setEmailVerificationStatus({
            isVerified: true,
            isSending: false,
            isRefreshing: false,
            message: "Email verified successfully!",
            isError: false,
          });
        } else {
          setEmailVerificationStatus((prev) => ({
            ...prev,
            isVerified: false,
            isRefreshing: false,
          }));
        }
      } catch (error) {
        setEmailVerificationStatus((prev) => ({
          ...prev,
          isVerified: false,
          isRefreshing: false,
        }));
        console.log("Error checking email verification status:", error);
      }
    };

    fetchUser();
    fetchAddress();
    if (user.email) {
      checkEmailVerification();
    }
  }, [user.email]);

  const handleRefreshVerification = async () => {
    if (!user.email) return;

    setEmailVerificationStatus((prev) => ({
      ...prev,
      isRefreshing: true,
      message: "Checking verification status...",
      isError: false,
    }));

    await checkEmailVerification();
  };

  // Handle email verification by calling the POST_EMAIL API
  const handleEmailVerification = async () => {
    if (!user.email) {
      setEmailVerificationStatus({
        isVerified: false,
        isSending: false,
        message: "No email address found",
        isError: true,
      });
      return;
    }

    setEmailVerificationStatus((prev) => ({
      ...prev,
      isSending: true,
      message: "Sending verification email...",
      isError: false,
    }));

    try {
      const response = await axiosInstance.post(
        API_URL.EMAIL_LOGIN.POST_EMAIL,
        {
          user_uuid: uuid,
          email: user.email,
        }
      );

      if (response.data.is_verified) {
        setEmailVerificationStatus({
          isVerified: true,
          isSending: false,
          message: "Email is already verified!",
          isError: false,
        });
      } else {
        setEmailVerificationStatus({
          isVerified: false,
          isSending: false,
          message:
            "Verification email sent! Please check your inbox and click the link.",
          isError: false,
        });
      }
    } catch (error) {
      console.error("Email verification error:", error);
      setEmailVerificationStatus({
        isVerified: false,
        isSending: false,
        message:
          error.response?.data?.message || "Failed to send verification email",
        isError: true,
      });
    }
  };

  // Check email verification status when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && user.email) {
        try {
          const response = await axiosInstance.get(
            API_URL.EMAIL_LOGIN.GET_EMAIL_VERIFIED,
            {
              params: { email: user.email },
            }
          );
          if (response.data.email_verified === true) {
            setEmailVerificationStatus({
              isVerified: true,
              isSending: false,
              isRefreshing: false,
              message: "Email verified successfully!",
              isError: false,
            });
          } else {
            setEmailVerificationStatus((prev) => ({
              ...prev,
              isVerified: false,
            }));
          }
        } catch (error) {
          setEmailVerificationStatus((prev) => ({
            ...prev,
            isVerified: false,
          }));
          console.log("Error checking email verification status:", error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setAddressData((prev) => ({ ...prev, image: files[0] }));
      if (files[0]) {
        setImagePreview(URL.createObjectURL(files[0]));
      } else {
        setImagePreview("/Images/image-placeholder.png");
      }
    } else {
      setAddressData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateAddress = () => {
    const errors = {};
    if (!addressData.house_name) errors.house_name = "House name is required";
    if (!addressData.street_name)
      errors.street_name = "Street address is required";
    if (!addressData.city) errors.city = "City is required";
    if (!addressData.state) errors.state = "State is required";
    if (!addressData.country) errors.country = "Country is required";
    if (!addressData.pin) errors.pin = "Pin is required";
    return errors;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const errors = validateAddress();
    setLocalErrors(errors);
    setApiErrors({});
    if (Object.keys(errors).length > 0) return;
    onNext();
  };

  return (
    <div className="h-[80%] flex flex-col sm:flex-row py-5">
      {/* Left Side */}
      <div className="border-r-0 sm:border-r border-b sm:border-b-0 border-[#DEDEDE] w-full sm:w-[50%] px-5 sm:px-10 flex flex-col gap-5 pb-5 sm:pb-0">
        <form className="flex flex-col gap-8" onSubmit={handleNext}>
          <div className="bg-[#C2C2C233] w-fit rounded-sm flex flex-col items-center relative">
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer relative group"
            >
              <img
                src={imagePreview}
                className="xl:w-[210px] xl:h-[150px] w-[180px] h-[130px] shadow object-cover"
                alt="Profile Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-sm">
                <button
                  type="button"
                  className="bg-white text-[#467EF8] px-3 py-1 rounded shadow text-xs font-semibold flex items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("profile-image-upload").click();
                  }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M5 20h14a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 15.17 3H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Zm7-3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                    />
                  </svg>
                  Edit
                </button>
              </div>
            </label>
            <input
              id="profile-image-upload"
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
              Name
            </label>
            <div className="flex flex-col xl:flex-row gap-5">
              <input
                className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
                placeholder={user.full_name}
                value={user.full_name || ""}
                disabled
              />
              <input
                className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
                placeholder={user.last_name}
                value={user.last_name || ""}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
              Phone Number
            </label>
            <input
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
              placeholder={user.phone_number}
              value={user.phone_number || ""}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
              Email
            </label>
            <div className="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center">
              <input
                className="xl:w-[310px] w-[90%] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
                placeholder={user.email}
                value={user.email || ""}
                disabled
              />
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={handleEmailVerification}
                  disabled={
                    emailVerificationStatus.isSending ||
                    emailVerificationStatus.isVerified ||
                    emailVerificationStatus.isRefreshing
                  }
                  className={`text-[14px] xl:text-[16px] font-bold font-sans py-2 rounded transition-all duration-200 ease-initial ${
                    emailVerificationStatus.isVerified
                      ? "text-[#16B338] cursor-default"
                      : emailVerificationStatus.isSending ||
                        emailVerificationStatus.isRefreshing
                      ? "text-[#999] cursor-not-allowed"
                      : "text-[#467EF8] cursor-pointer hover:text-[#769beb]"
                  }`}
                >
                  {emailVerificationStatus.isVerified
                    ? "✓ Verified"
                    : emailVerificationStatus.isSending
                    ? "Sending..."
                    : "Verify Now"}
                </button>

                {!emailVerificationStatus.isVerified && (
                  <button
                    type="button"
                    onClick={handleRefreshVerification}
                    disabled={
                      emailVerificationStatus.isSending ||
                      emailVerificationStatus.isRefreshing
                    }
                    className={`text-[14px] xl:text-[16px] font-bold font-sans py-2 px-2 rounded transition-all duration-200 ease-initial ${
                      emailVerificationStatus.isSending ||
                      emailVerificationStatus.isRefreshing
                        ? "text-[#999] cursor-not-allowed"
                        : "text-[#467EF8] cursor-pointer hover:text-[#769beb]"
                    }`}
                    title="Refresh verification status"
                  >
                    {emailVerificationStatus.isRefreshing ? "🔄" : "↻"}
                  </button>
                )}
              </div>
            </div>
            {emailVerificationStatus.message && (
              <div
                className={`text-sm mt-2 ${
                  emailVerificationStatus.isError
                    ? "text-red-500"
                    : emailVerificationStatus.isVerified
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {emailVerificationStatus.message}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="w-full sm:w-[50%] px-5 sm:px-10 flex flex-col gap-5 ">
        <form className="flex flex-col gap-5 py-5" onSubmit={handleNext}>
          <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
            Addresses
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] focus:outline-none focus:border-[#8d8c8c] bg-[#F4F4F4] pl-1"
                placeholder="House name, Flat no"
                name="house_name"
                value={addressData.house_name}
                onChange={handleChange}
              />
              {localErrors.house_name && (
                <span className="text-red-500 text-xs mt-1">
                  {localErrors.house_name}
                </span>
              )}
              {apiErrors.house_name && (
                <span className="text-red-500 text-xs mt-1">
                  {apiErrors.house_name}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] focus:outline-none focus:border-[#8d8c8c] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="Street address"
                name="street_name"
                value={addressData.street_name}
                onChange={handleChange}
              />
              {localErrors.street_name && (
                <span className="text-red-500 text-xs mt-1">
                  {localErrors.street_name}
                </span>
              )}
              {apiErrors.street_name && (
                <span className="text-red-500 text-xs mt-1">
                  {apiErrors.street_name}
                </span>
              )}
            </div>
            <div className="flex flex-col xl:flex-row gap-[10px]">
              <div className="flex flex-col w-full xl:w-auto">
                <input
                  className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] focus:outline-none focus:border-[#8d8c8c] rounded-[8px] bg-[#F4F4F4] pl-1"
                  placeholder="City"
                  name="city"
                  value={addressData.city}
                  onChange={handleChange}
                />
                {localErrors.city && (
                  <span className="text-red-500 text-xs mt-1">
                    {localErrors.city}
                  </span>
                )}
                {apiErrors.city && (
                  <span className="text-red-500 text-xs mt-1">
                    {apiErrors.city}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full xl:w-auto">
                <input
                  className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] focus:outline-none focus:border-[#8d8c8c] rounded-[8px] bg-[#F4F4F4] pl-1"
                  placeholder="State"
                  name="state"
                  value={addressData.state}
                  onChange={handleChange}
                />
                {localErrors.state && (
                  <span className="text-red-500 text-xs mt-1">
                    {localErrors.state}
                  </span>
                )}
                {apiErrors.state && (
                  <span className="text-red-500 text-xs mt-1">
                    {apiErrors.state}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <input
                className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] focus:outline-none focus:border-[#8d8c8c] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="Country"
                name="country"
                value={addressData.country}
                onChange={handleChange}
              />
              {localErrors.country && (
                <span className="text-red-500 text-xs mt-1">
                  {localErrors.country}
                </span>
              )}
              {apiErrors.country && (
                <span className="text-red-500 text-xs mt-1">
                  {apiErrors.country}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] focus:outline-none focus:border-[#8d8c8c] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="Postal Code"
                name="pin"
                type="number"
                value={addressData.pin}
                onChange={handleChange}
              />
              {localErrors.pin && (
                <span className="text-red-500 text-xs mt-1">
                  {localErrors.pin}
                </span>
              )}
              {apiErrors.pin && (
                <span className="text-red-500 text-xs mt-1">
                  {apiErrors.pin}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-[100px] self-end h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[18px] flex items-center justify-center  active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <p>Next</p>
          </button>
        </form>
      </div>
    </div>
  );
};

const SellingDetailForm = ({ sellerData, setSellerData, onSubmitAll }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [localErrors, setLocalErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_URL.SELLERS.CATEGORY);
      console.log(response);
      setCategories(
        Array.isArray(response.data.data) ? response.data.data : []
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const id = Number(value);
      setSellerData((prev) => ({
        ...prev,
        categories: checked
          ? [...(prev.categories || []), id]
          : (prev.categories || []).filter((catId) => catId !== id),
      }));
    } else {
      setSellerData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateSeller = () => {
    const errors = {};
    if (!sellerData.store_name) errors.store_name = "Store name is required";
    if (!sellerData.categories || sellerData.categories.length === 0)
      errors.categories = "Select at least one category";
    if (!sellerData.inventory_estimate)
      errors.inventory_estimate = "Inventory estimate is required";
    if (!sellerData.specialization)
      errors.specialization = "Specialization is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSeller();
    setLocalErrors(errors);
    setApiErrors({});
    if (Object.keys(errors).length > 0) return;
    onSubmitAll(setApiErrors);
  };

  return (
    <div className="h-[80%] flex flex-col sm:flex-row py-5">
      <div className="border-r-0 sm:border-r border-b sm:border-b-0 border-[#DEDEDE] w-full sm:w-[50%] px-5 sm:px-10 flex flex-col gap-5 pb-5 sm:pb-0">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
              Store Name
            </label>
            <input
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
              placeholder="Store"
              name="store_name"
              value={sellerData.store_name || ""}
              onChange={handleChange}
            />
            {localErrors.store_name && (
              <span className="text-red-500 text-xs">
                {localErrors.store_name}
              </span>
            )}
            {apiErrors.store_name && (
              <span className="text-red-500 text-xs">
                {apiErrors.store_name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
              Category
            </label>
            <div className="flex gap-5 flex-wrap">
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex gap-1 items-center font-regular text-[#464646]"
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      value={cat.id}
                      checked={sellerData.categories.includes(cat.id)}
                      onChange={handleChange}
                    />
                    {cat.name}
                  </label>
                ))}
            </div>
            {localErrors.categories && (
              <span className="text-red-500 text-xs">
                {localErrors.categories}
              </span>
            )}
            {apiErrors.categories && (
              <span className="text-red-500 text-xs">
                {apiErrors.categories}
              </span>
            )}
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center gap-1">
            <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
              Inventory Estimate
            </label>
            <select
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
              placeholder="Enter Your Number"
              name="inventory_estimate"
              value={sellerData.inventory_estimate || ""}
              onChange={handleChange}
            >
              <option value="">Select estimate</option>
              <option value="<1000">Less than 1000</option>
              <option value="1000-5000">1000 - 5000</option>
              <option value="5000+">5000+</option>
            </select>
            {localErrors.inventory_estimate && (
              <span className="text-red-500 text-xs">
                {localErrors.inventory_estimate}
              </span>
            )}
            {apiErrors.inventory_estimate && (
              <span className="text-red-500 text-xs">
                {apiErrors.inventory_estimate}
              </span>
            )}
          </div>
        </form>
      </div>
      <div className="w-full sm:w-[50%] px-5 sm:px-10 relative">
        <form className="flex flex-col gap-5 py-5" onSubmit={handleSubmit}>
          <label className="lg:text-[18px] xl:text-[15px] text-[14px] font-bold text-[#464646]">
            Specialization
          </label>
          <textarea
            style={{ overflowY: "scroll", scrollbarWidth: "none" }}
            className="w-[90%] h-[250px] xl:w-[400px] xl:h-[200px] border border-[#E3E3E3] rounded-[14px] focus:outline-none focus:border-[#8d8c8c] p-2 overflow-y-auto"
            placeholder="Eg: Welcome to Itachi Stores, your destination for rare and collectible comics. We specialize in curating vintage issues, limited editions, and must-have graphic novels for dedicated fans and serious collectors alike. Discover the stories that shaped generations."
            name="specialization"
            value={sellerData.specialization || ""}
            onChange={handleChange}
          ></textarea>
          {localErrors.specialization && (
            <span className="text-red-500 text-xs">
              {localErrors.specialization}
            </span>
          )}
          {apiErrors.specialization && (
            <span className="text-red-500 text-xs">
              {apiErrors.specialization}
            </span>
          )}
          <button
            onClick={handleSubmit}
            className=" w-[120px] h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[16px] flex items-center justify-center self-end active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <p>Submit</p>
          </button>
        </form>
      </div>
    </div>
  );
};

const Stepper = ({ step, setStep }) => (
  <div className="flex items-center gap-6 relative">
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => setStep(1)}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
          step === 1
            ? "bg-[#464646] text-white"
            : step > 1
            ? "bg-[#16B338] text-white"
            : "bg-[#E0E0E0] text-[#a0a0a0]"
        }`}
      >
        1
      </div>
      <p
        className={`xl:text-xs text-[10px] sm:text-xs text-center mt-2 leading-tight transition-all duration-300 ${
          step >= 1 ? "text-[#464646]" : "text-[#a0a0a0]"
        }`}
      >
        Personal
        <br />
        Details Form
      </p>
    </div>
    <div className="relative w-20 sm:w-28 h-[8px] bg-[#D3D3D3] overflow-hidden rounded-sm">
      <div
        className={`h-full transition-all duration-1000 ${
          step === 2 ? "w-full" : "w-0"
        } bg-gradient-to-r from-[#16B338] via-[#16B338] to-[#C7C7C7]`}
      />
    </div>
    <div className="flex flex-col items-center">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
          step === 2 ? "bg-[#464646] text-white" : "bg-[#E0E0E0] text-[#a0a0a0]"
        }`}
      >
        2
      </div>
      <p
        className={`text-[10px] sm:text-xs text-center mt-2 leading-tight transition-all duration-300 ${
          step === 2 ? "text-[#464646]" : "text-[#a0a0a0]"
        }`}
      >
        Seller
        <br />
        Details Form
      </p>
    </div>
  </div>
);

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({});
  const uuid = localStorage.getItem("uuid");

  const [addressData, setAddressData] = useState({
    house_name: "",
    street_name: "",
    country: "",
    state: "",
    pin: "",
    city: "",
    image: null,
  });

  const [sellerData, setSellerData] = useState({
    store_name: "",
    categories: [],
    inventory_estimate: "",
    specialization: "",
  });

  console.log(sellerData);

  const [imagePreview, setImagePreview] = useState(
    "/Images/image-placeholder.png"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(
        API_URL.USER.GET_USER_UUID(uuid)
      );
      console.log(response);
      setUser(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmitAll = async (setApiErrors) => {
    setIsSubmitting(true);
    try {
      const addressFormData = new FormData();
      addressFormData.append("user_uuid", uuid);
      addressFormData.append("house_name", addressData.house_name);
      addressFormData.append("street_name", addressData.street_name);
      addressFormData.append("country", addressData.country);
      addressFormData.append("state", addressData.state);
      addressFormData.append("pin", addressData.pin);
      addressFormData.append("city", addressData.city);
      if (addressData.image) {
        addressFormData.append("image", addressData.image);
      }

      let addressResponse;
      try {
        addressResponse = await axiosInstance.post(
          API_URL.ADDRESS.POST_ADDRESS,
          addressFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Address submitted:", addressResponse);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setApiErrors(err.response.data.errors);
        } else {
          setApiErrors({ general: "Failed to submit address" });
        }
        setIsSubmitting(false);
        return;
      }

      const sellerPayload = {
        user_uuid: uuid,
        store_name: sellerData.store_name,
        category_ids: sellerData.categories,
        inventory_estimate: sellerData.inventory_estimate,
        specialization: sellerData.specialization,
      };

      try {
        const sellerResponse = await axiosInstance.post(
          API_URL.SELLERS.POST_SELLERS,
          sellerPayload
        );
        console.log("Seller data submitted:", sellerResponse);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setApiErrors(err.response.data.errors);
        } else {
          setApiErrors({ general: "Failed to submit seller data" });
        }
        setIsSubmitting(false);
        return;
      }

      setTimeout(() => {
        navigate("/user/profile");
      }, 200);
    } catch (err) {
      setApiErrors({ general: "Unexpected error occurred" });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-bl from-[#DFF7F5] to-[#FFFEFA] flex items-center justify-center">
      <div className="w-[95%] sm:w-[90%] h-[90%] sm:h-[85%] shadow-[0_0_17px_0_#00000014] transition-all duration-400 bg-white rounded-[14px] flex flex-col px-3 sm:px-5">
        <div className="h-auto sm:h-[20%] border-b border-[#DEDEDE] flex flex-col sm:flex-row justify-between px-5 sm:px-10 py-5 sm:py-0">
          <div className="order-2 sm:order-1 font-sans font-bold text-[24px] md:text-[30px] lg:text-[35px] xl:text-[40px] text-[#464646] items-center flex">
            <p>
              {step === 1 ? "Personal Details Form" : "Selling Details Form"}
            </p>
          </div>
          <div className="order-1 sm:order-2 flex items-center justify-center sm:justify-end mb-4 sm:mb-0">
            <Stepper step={step} setStep={setStep} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {step === 1 ? (
            <PersonalDetailForm
              user={user}
              onNext={() => setStep(2)}
              addressData={addressData}
              setAddressData={setAddressData}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          ) : (
            <SellingDetailForm
              sellerData={sellerData}
              setSellerData={setSellerData}
              onSubmitAll={handleSubmitAll}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
