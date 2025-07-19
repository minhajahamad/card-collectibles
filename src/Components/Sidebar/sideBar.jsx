import React, { useEffect, useRef, useState } from 'react';
import { CiPower } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/axios';
import { API_URL } from '../../services/api_url';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState('/Images/image-placeholder.png');
  const [addressUuid, setAddressUuid] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch address and image on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const uuid = localStorage.getItem('uuid');
        if (!uuid) return;

        // Use the same API call as PersonalDetailForm
        const res = await axiosInstance.get(API_URL.ADDRESS.GET_ADDRESS_UUID(uuid));
        const addresses = res?.data?.data?.addresses;

        if (addresses && addresses.length > 0) {
          const addr = addresses[0];
          setAddressUuid(addr.uuid); // This is the address UUID we need for patching
          if (addr.image) {
            setImageUrl(addr.image);
          }
        }
      } catch (err) {
        console.log('Error fetching address:', err);
        setImageUrl('/Images/image-placeholder.png');
      }
    };
    fetchAddress();
  }, []);

  const handleEditClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !addressUuid) return;

    setIsUploading(true);
    setImageUrl(URL.createObjectURL(file)); // Preview

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Use the same PATCH endpoint structure as PersonalDetailForm
      await axiosInstance.patch(
        API_URL.ADDRESS.PATCH_ADDRESS(addressUuid),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // Refetch to get the updated image URL from backend
      const uuid = localStorage.getItem('uuid');
      const res = await axiosInstance.get(API_URL.ADDRESS.GET_ADDRESS_UUID(uuid));
      const addresses = res?.data?.data?.addresses;

      if (addresses && addresses.length > 0 && addresses[0].image) {
        setImageUrl(addresses[0].image);
      }
    } catch (err) {
      console.log('Error uploading image:', err);
      setImageUrl('/Images/image-placeholder.png');
    } finally {
      setIsUploading(false);
    }
  };

  const getActiveTab = () => {
    if (location.pathname.includes('/user/profile')) return 'profile';
    if (location.pathname.includes('/user/affiliates')) return 'affiliates';
    if (location.pathname.includes('/user/help-support')) return 'support';
    return '';
  };

  const activeTab = getActiveTab();

  const handleClick = route => {
    navigate(route);
  };

  return (
    <div className="xl:w-[310px] xl:py-[60px] font-sans hidden xl:flex flex-col gap-10 ">
      {/* Image with edit icon overlay */}
      <div className="bg-[#C2C2C233] xl:w-fit rounded-sm mx-auto relative group">
        <img
          src={imageUrl}
          className="xl:w-[190px] xl:h-[150px] shadow object-cover"
          alt="Profile"
        />
        {/* Edit icon overlay */}
        <button
          type="button"
          onClick={handleEditClick}
          className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:scale-105 transition group-hover:opacity-100 opacity-80"
          style={{ zIndex: 2 }}
          disabled={isUploading}
        >
          <img src="/Images/Edit.svg" alt="Edit" className="w-6 h-6" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center text-[#107D91] font-bold text-lg rounded-sm z-10">
            Uploading...
          </div>
        )}
      </div>

      <div className="flex flex-col gap-50">
        {/* Menu Items */}
        <div className="xl:pl-10 xl:pr-7 text-[#464646] xl:text-[20px]">
          {/* Profile */}
          <div
            onClick={() => handleClick('/user/profile')}
            className="relative px-8 py-2 cursor-pointer overflow-hidden border-b-2 border-[#E0E0E0] flex items-center"
          >
            <span
              className={`absolute left-0 top-1/2 w-[4px] h-[40px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${activeTab === 'profile' ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <p
              className={`transition-colors duration-300 ${activeTab === 'profile'
                  ? 'text-black font-semibold'
                  : 'text-[#464646]'
                } hover:text-black`}
            >
              Seller Profile
            </p>
          </div>

          {/* Affiliates */}
          <div
            onClick={() => handleClick('/user/affiliates')}
            className="relative px-8 py-2 cursor-pointer overflow-hidden border-b-2 border-[#E0E0E0] flex items-center"
          >
            <span
              className={`absolute left-0 top-1/2 w-[4px] h-[40px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${activeTab === 'affiliates' ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <p
              className={`transition-colors duration-300 ${activeTab === 'affiliates'
                  ? 'text-black font-semibold'
                  : 'text-[#464646]'
                } hover:text-black`}
            >
              Affiliates
            </p>
          </div>

          {/* Help & Support */}
          <div
            onClick={() => handleClick('/user/help-support')}
            className="relative px-8 py-2 cursor-pointer overflow-hidden border-b-2 border-[#E0E0E0] flex items-center"
          >
            <span
              className={`absolute left-0 top-1/2 w-[4px] h-[40px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${activeTab === 'support' ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <p
              className={`transition-colors duration-300 ${activeTab === 'support'
                  ? 'text-black font-semibold'
                  : 'text-[#464646]'
                } hover:text-black`}
            >
              Help & Support
            </p>
          </div>
        </div>

        {/* Log Out Button */}
        <div
          onClick={() => {
            localStorage.clear();
            localStorage.setItem('login', 'false');
            setTimeout(() => {
              navigate('/');
            }, 250);
          }}
          className="mx-auto flex gap-2 items-center border-2 border-[#107D91] group rounded-[64px] px-3 py-2 shadow-[0px_2px_16.4px_0px_#0000001C] hover:shadow-none transition-all duration-200 ease-in-out cursor-pointer"
        >
          <CiPower className="text-[#C84047] text-[20px] group-active:scale-90 transition duration-150 ease-in-out" />
          <p className="text-[18px] text-[#707070]">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
