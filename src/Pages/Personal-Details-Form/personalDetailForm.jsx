// export default PersonalDetailForm;
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axios';
import { API_URL } from '../../services/api_url';
import {
  sendEmailVerificationLink,
  handleEmailVerificationLink,
  checkEmailVerificationStatus,
  onEmailVerificationStateChange
} from '../../services/firebase/firebaseApp'; // Adjust path as needed

const PersonalDetailForm = ({ onNext, addressData, setAddressData, imagePreview, setImagePreview }) => {
  const [user, setUser] = useState({});
  const [emailVerificationStatus, setEmailVerificationStatus] = useState({
    isVerified: false,
    isSending: false,
    message: '',
    isError: false
  });
  const uuid = localStorage.getItem('uuid');

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_URL.USER.GET_USER_UUID(uuid));
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
  }

  // Check for email verification link on component mount
  useEffect(() => {
    const checkForVerificationLink = async () => {
      try {
        const result = await handleEmailVerificationLink();
        if (result.success && result.isVerified) {
          setEmailVerificationStatus({
            isVerified: true,
            isSending: false,
            message: 'Email verified successfully!',
            isError: false
          });

          // Update user verification status in your backend if needed
          // You can call your API here to update the user's email verification status

        }
      } catch (error) {
        console.log('No verification link found or error:', error);
      }
    };

    checkForVerificationLink();
    fetchUser();
    fetchAddress();
  }, []);

  // Set up auth state listener to monitor email verification
  useEffect(() => {
    const unsubscribe = onEmailVerificationStateChange((isVerified, firebaseUser) => {
      if (firebaseUser && isVerified) {
        setEmailVerificationStatus(prev => ({
          ...prev,
          isVerified: true,
          message: 'Email verified successfully!',
          isError: false
        }));
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);
  const handleEmailVerification = async () => {
    if (!user.email) {
      setEmailVerificationStatus({
        isVerified: false,
        isSending: false,
        message: 'No email address found',
        isError: true
      });
      return;
    }

    setEmailVerificationStatus(prev => ({
      ...prev,
      isSending: true,
      message: 'Sending verification email...',
      isError: false
    }));

    try {
      const result = await sendEmailVerificationLink(user.email);

      if (result.success) {
        if (result.isVerified) {
          setEmailVerificationStatus({
            isVerified: true,
            isSending: false,
            message: 'Email is already verified!',
            isError: false
          });
        } else {
          setEmailVerificationStatus({
            isVerified: false,
            isSending: false,
            message: 'Verification email sent! Please check your inbox and click the link.',
            isError: false
          });
        }
      } else {
        // Handle specific error codes
        let errorMessage = result.error || 'Failed to send verification email';

        if (result.code === 'auth/operation-not-allowed') {
          errorMessage = 'Please enable Email/Password authentication in Firebase Console.';
        }

        setEmailVerificationStatus({
          isVerified: false,
          isSending: false,
          message: errorMessage,
          isError: true
        });
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setEmailVerificationStatus({
        isVerified: false,
        isSending: false,
        message: 'Error sending verification email. Please try again.',
        isError: true
      });
    }
  };

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const result = await checkEmailVerificationStatus();
        if (result.success && result.isVerified) {
          setEmailVerificationStatus({
            isVerified: true,
            isSending: false,
            message: 'Email verified successfully!',
            isError: false
          });
        }
      } catch (error) {
        console.log('Error checking email verification status:', error);
      }
    };

    if (user.email) {
      checkEmailVerification();
    }
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setAddressData((prev) => ({ ...prev, image: files[0] }));
      if (files[0]) {
        setImagePreview(URL.createObjectURL(files[0]));
      } else {
        setImagePreview('/Images/image-placeholder.png');
      }
    } else {
      setAddressData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Just move to next step without submitting
    onNext();
  };

  return (
    <div className="h-[80%] flex py-5">
      {/* Left Side */}
      <div className="border-r border-[#DEDEDE] w-[50%] px-10 flex flex-col gap-5">
        <form className="flex flex-col gap-8" onSubmit={handleNext}>
          <div className="bg-[#C2C2C233] w-fit rounded-sm flex flex-col items-center">
            {/* File input for image upload, show preview or placeholder */}
            <label htmlFor="profile-image-upload" className="cursor-pointer">
              <img
                src={imagePreview}
                className="xl:w-[210px] xl:h-[150px] shadow object-cover"
                alt="Profile Preview"
              />
            </label>
            <input
              id="profile-image-upload"
              type="file"
              name="image"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Name
            </label>
            <div className="flex flex-col xl:flex-row gap-5">
              <input
                className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
                placeholder={user.full_name}
                value={user.full_name || ''}
                disabled
              />
              <input
                className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
                placeholder={user.last_name}
                value={user.last_name || ''}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Phone Number
            </label>
            <input
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
              placeholder={user.phone_number}
              value={user.phone_number || ''}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Email
            </label>
            <div className="flex gap-5 items-center">
              <input
                className="xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-3 focus:outline-none focus:border-[#8d8c8c]"
                placeholder={user.email}
                value={user.email || ''}
                disabled
              />
              <button
                type="button"
                onClick={handleEmailVerification}
                disabled={emailVerificationStatus.isSending || emailVerificationStatus.isVerified}
                className={`text-[16px] font-bold font-sans px-4 py-2 rounded transition-all duration-200 ease-initial ${emailVerificationStatus.isVerified
                    ? 'text-[#16B338] cursor-default'
                    : emailVerificationStatus.isSending
                      ? 'text-[#999] cursor-not-allowed'
                      : 'text-[#467EF8] cursor-pointer hover:text-[#769beb]'
                  }`}
              >
                {emailVerificationStatus.isVerified
                  ? '✓ Verified'
                  : emailVerificationStatus.isSending
                    ? 'Sending...'
                    : 'Verify Now'}
              </button>
            </div>
            {/* Email verification status message */}
            {emailVerificationStatus.message && (
              <div className={`text-sm mt-2 ${emailVerificationStatus.isError
                  ? 'text-red-500'
                  : emailVerificationStatus.isVerified
                    ? 'text-green-600'
                    : 'text-blue-600'
                }`}>
                {emailVerificationStatus.message}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="w-[50%] px-10 relative">
        <form className="flex flex-col gap-1" onSubmit={handleNext}>
          <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
            Addresses
          </label>
          <div className="flex flex-col gap-4">
            <input
              className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="House name, Flat no"
              name="house_name"
              value={addressData.house_name}
              onChange={handleChange}
            />
            <input
              className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Street address"
              name="street_name"
              value={addressData.street_name}
              onChange={handleChange}
            />
            {/* No landmark field in API, so skipping */}
            <div className="flex flex-col xl:flex-row gap-[10px]">
              <input
                className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="City"
                name="city"
                value={addressData.city}
                onChange={handleChange}
              />
              <input
                className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="State"
                name="state"
                value={addressData.state}
                onChange={handleChange}
              />
            </div>
            <input
              className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Country"
              name="country"
              value={addressData.country}
              onChange={handleChange}
            />
            <input
              className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Pin"
              name="pin"
              value={addressData.pin}
              onChange={handleChange}
            />
          </div>
          <button type='submit'
            className="w-[100px] h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[18px] flex items-center justify-center absolute bottom-[20px] right-[20px] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
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
  const [categories, setCategories] = useState({});

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_URL.SELLERS.CATEGORY);
      console.log(response);
      setCategories(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSellerData((prev) => ({
        ...prev,
        categories: checked
          ? [...(prev.categories || []), value]
          : (prev.categories || []).filter(cat => cat !== value)
      }));
    } else {
      setSellerData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitAll();
  };

  return (
    <div className="h-[80%] flex py-5">
      <div className="border-r border-[#DEDEDE] w-[50%] px-10 flex flex-col gap-5">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Store Name
            </label>
            <input
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
              placeholder="Store"
              name="store_name"
              value={sellerData.store_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Category
            </label>
            <div className="flex gap-5">
              <label className="flex gap-1 items-center font-regular text-[#464646]">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  value="TCG"
                  checked={sellerData.categories?.includes('TCG') || false}
                  onChange={handleChange}
                />
                TCG
              </label>
              <label className="flex gap-1 items-center font-regular text-[#464646]">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  value="Comics"
                  checked={sellerData.categories?.includes('Comics') || false}
                  onChange={handleChange}
                />
                Comics
              </label>
              <label className="flex gap-1 items-center font-regular text-[#464646]">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  value="Collectibles"
                  checked={sellerData.categories?.includes('Collectibles') || false}
                  onChange={handleChange}
                />
                Collectibles
              </label>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row  xl:items-center gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Inventory Estimate
            </label>
            <select
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
              placeholder="Enter Your Number"
              name="inventory_estimate"
              value={sellerData.inventory_estimate || ''}
              onChange={handleChange}
            >
              <option value="">Select estimate</option>
              <option value="<1000">Less than 1000</option>
              <option value="1000-5000">1000 - 5000</option>
              <option value="5000+">5000+</option>
            </select>
          </div>
        </form>
      </div>
      <div className="w-[50%] px-10 relative ">
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
            Specialization
          </label>
          <textarea
            style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
            className="w-[90%] h-[250px] xl:w-[400px] xl:h-[200px] border border-[#E3E3E3] rounded-[14px] focus:outline-none focus:border-[#8d8c8c] p-2 overflow-y-auto "
            placeholder="Eg: Welcome to Itachi Stores, your destination for rare and collectible comics. We specialize in curating vintage issues, limited editions, and must-have graphic novels for dedicated fans and serious collectors alike. Discover the stories that shaped generations."
            name="specialization"
            value={sellerData.specialization || ''}
            onChange={handleChange}
          ></textarea>
        </form>
        <button
          onClick={handleSubmit}
          className="w-[120px] h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[16px] flex items-center justify-center absolute bottom-[20px] right-[20px] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <p>Submit</p>
        </button>
      </div>
    </div>
  );
};

// Progress Bar
const Stepper = ({ step, setStep }) => (
  <div className="flex items-center gap-6 relative">
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => setStep(1)}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${step === 1
          ? 'bg-[#464646] text-white'
          : step > 1
            ? 'bg-[#16B338] text-white'
            : 'bg-[#E0E0E0] text-[#a0a0a0]'
          }`}
      >
        1
      </div>
      <p
        className={`text-xs text-center mt-2 leading-tight transition-all duration-300 ${step >= 1 ? 'text-[#464646]' : 'text-[#a0a0a0]'
          }`}
      >
        Personal
        <br />
        Details Form
      </p>
    </div>
    <div className="relative w-28 h-[8px] bg-[#D3D3D3] overflow-hidden rounded-sm">
      <div
        className={`h-full transition-all duration-1000 ${step === 2 ? 'w-full' : 'w-0'
          } bg-gradient-to-r from-[#16B338] via-[#16B338] to-[#C7C7C7]`}
      />
    </div>
    <div className="flex flex-col items-center">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${step === 2 ? 'bg-[#464646] text-white' : 'bg-[#E0E0E0] text-[#a0a0a0]'
          }`}
      >
        2
      </div>
      <p
        className={`text-xs text-center mt-2 leading-tight transition-all duration-300 ${step === 2 ? 'text-[#464646]' : 'text-[#a0a0a0]'
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
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({});
  const uuid = localStorage.getItem("uuid");

  // State for both forms
  const [addressData, setAddressData] = useState({
    house_name: '',
    street_name: '',
    country: '',
    state: '',
    pin: '',
    city: '',
    image: null,
  });

  const [sellerData, setSellerData] = useState({
    store_name: '',
    categories: [],
    inventory_estimate: '',
    specialization: '',
  });

  const [imagePreview, setImagePreview] = useState('/Images/image-placeholder.png');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_URL.USER.GET_USER_UUID(uuid));
      console.log(response);
      setUser(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);



  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    try {
      // Submit address data
      const addressFormData = new FormData();
      addressFormData.append('user_uuid', uuid);
      addressFormData.append('house_name', addressData.house_name);
      addressFormData.append('street_name', addressData.street_name);
      addressFormData.append('country', addressData.country);
      addressFormData.append('state', addressData.state);
      addressFormData.append('pin', addressData.pin);
      addressFormData.append('city', addressData.city);
      if (addressData.image) {
        addressFormData.append('image', addressData.image);
      }

      const addressResponse = await axiosInstance.post(API_URL.ADDRESS.POST_ADDRESS, addressFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Address submitted:', addressResponse);

      // Submit seller data
      const sellerPayload = {
        user_uuid: uuid,
        store_name: sellerData.store_name,
        categories: sellerData.categories,
        inventory_estimate: sellerData.inventory_estimate,
        specialization: sellerData.specialization,
      };

      const sellerResponse = await axiosInstance.post(API_URL.SELLERS.POST_SELLERS, sellerPayload);
      console.log('Seller data submitted:', sellerResponse);

      // Navigate to profile page after successful submission
      setTimeout(() => {
        window.location.href = '/user/profile';
      }, 200);

    } catch (err) {
      console.log('Error submitting forms:', err);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-bl from-[#DFF7F5] to-[#FFFEFA] flex items-center justify-center">
      <div className="w-[90%] h-[85%] shadow-[0_0_17px_0_#00000014] transition-all duration-400 bg-white rounded-[14px] flex flex-col px-5">
        <div className="h-[20%] border-b border-[#DEDEDE] flex justify-between px-10">
          <div className="font-sans font-bold text-[40px] text-[#464646] items-center flex">
            <p>
              {step === 1 ? 'Personal Details Form' : 'Selling Details Form'}
            </p>
          </div>
          <Stepper step={step} setStep={setStep} />
        </div>
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
  );
};

export default MultiStepForm;
