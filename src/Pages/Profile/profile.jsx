import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/navBar';
import SideBar from '../../Components/Sidebar/sideBar';
import { Tabs, Tab, Box } from '@mui/material';
import axiosInstance from '../../services/axios'; // Update the path as needed
import { API_URL } from '../../services/api_url'; // Update the path as needed

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Track which sections have been modified
  const [modifiedSections, setModifiedSections] = useState({
    user: false,
    address: false,
    store: false
  });

  // User data state
  const [userData, setUserData] = useState({
    full_name: '',
    last_name: '', // Keep last_name for now if needed elsewhere
    email: '',
    phone_number: ''
  });

  // Original user data for comparison
  const [originalUserData, setOriginalUserData] = useState({
    full_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  // Address data state with ID tracking
  const [addressData, setAddressData] = useState({
    uuid: null,
    street_address: '',
    apartment: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    address_type: ''
  });

  // Original address data for comparison
  const [originalAddressData, setOriginalAddressData] = useState({
    uuid: null,
    street_address: '',
    apartment: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    address_type: ''
  });

  // Store details state with ID tracking
  const [storeData, setStoreData] = useState({
    id: null,
    store_name: '',
    categories: [],
    inventory_estimate: '',
    specialization: ''
  });

  // Original store data for comparison
  const [originalStoreData, setOriginalStoreData] = useState({
    id: null,
    store_name: '',
    categories: [],
    inventory_estimate: '',
    specialization: ''
  });

  // Add state for categories list
  const [categoriesList, setCategoriesList] = useState([]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Fetch address data function (move to component scope)
  const fetchAddressData = async () => {
    try {
      const uuid = localStorage.getItem('uuid');
      if (!uuid) return;

      // Fetch address data
      const addressResponse = await axiosInstance.get(API_URL.ADDRESS.GET_ADDRESS_UUID(uuid));
      console.log(addressResponse);

      // FIX: Use correct response structure (data is an array)
      if (
        addressResponse.data &&
        addressResponse.data.data &&
        Array.isArray(addressResponse.data.data) &&
        addressResponse.data.data.length > 0
      ) {
        const addressInfo = addressResponse.data.data[0]; // Get first address
        const addressData = {
          uuid: addressInfo.uuid || addressInfo.id || null, // fallback to id if uuid is not present
          street_address: addressInfo.street_name || '',
          apartment: addressInfo.house_name || '',
          city: addressInfo.city || '',
          state: addressInfo.state || '',
          postal_code: addressInfo.pin || '',
          country: addressInfo.country || '',
          address_type: addressInfo.address_type || ''
        };
        setAddressData(addressData);
        setOriginalAddressData({ ...addressData });
      }
    } catch (error) {
      console.error('Error fetching address data:', error);
      // Address might not exist yet, that's okay
    }
  };

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_URL.CATEGORY.GET_CATEGORY);
      // Expecting response.data.data to be an array of { id, name }
      if (response.data && Array.isArray(response.data.data)) {
        setCategoriesList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch user data, address data, and store data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uuid = localStorage.getItem('uuid');
        if (!uuid) {
          console.error('UUID not found in localStorage');
          setLoading(false);
          return;
        }

        // Fetch user data
        const userResponse = await axiosInstance.get(API_URL.USER.GET_USER_UUID(uuid));
        console.log(userResponse);

        if (userResponse.data && userResponse.data.data) {
          // Use full_name directly
          const userInfo = {
            full_name: userResponse.data.data.full_name || '',
            last_name: userResponse.data.data.last_name || '',
            email: userResponse.data.data.email || '',
            phone_number: userResponse.data.data.phone_number || ''
          };
          setUserData(userInfo);
          setOriginalUserData({ ...userInfo });
        }
        setLoading(false); // <-- Ensure loading is set to false after fetch
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchAddressData();
    fetchUserData();
    fetchStoreData();
    fetchCategories(); // Fetch categories on mount
  }, []);

  // Fetch store data function
  const fetchStoreData = async () => {
    try {
      const uuid = localStorage.getItem('uuid');
      if (!uuid) return;

      const response = await axiosInstance.get(API_URL.SELLERS.GET__SELLERS);
      console.log(response);

      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Find store data that matches the current user's UUID
        const matchingStore = response.data.data.find(store =>
          store.user_uuid_display === uuid
        );

        console.log(matchingStore);
        
        if (matchingStore) {
          const storeDataObj = {
            id: matchingStore.id,
            store_name: matchingStore.store_name || '',
            categories: Array.isArray(matchingStore.categories)
              ? matchingStore.categories.map(cat => typeof cat === 'object' && cat.id ? cat.id : cat)
              : [],
            inventory_estimate: matchingStore.inventory_estimate || '',
            specialization: matchingStore.specialization || ''
          };
          setStoreData(storeDataObj);
          setOriginalStoreData({ ...storeDataObj });
          localStorage.setItem('store_id', matchingStore.id); // Save the correct store ID
        }
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
      // Store might not exist yet, that's okay
    }
  };


  // Helper function to compare objects and detect changes
  const hasDataChanged = (original, current) => {
    return JSON.stringify(original) !== JSON.stringify(current);
  };

  // Handle input changes for user data
  const handleUserInputChange = (field, value) => {
    if (isEditing) {
      const newUserData = {
        ...userData,
        [field]: value
      };
      setUserData(newUserData);
      // Mark user section as modified if data has changed
      const hasChanged = hasDataChanged(originalUserData, newUserData);
      setModifiedSections(prev => ({
        ...prev,
        user: hasChanged
      }));
    }
  };

  // Handle input changes for address data
  const handleAddressInputChange = (field, value) => {
    if (isEditing) {
      const newAddressData = {
        ...addressData,
        [field]: value
      };
      setAddressData(newAddressData);

      // Mark address section as modified if data has changed
      const hasChanged = hasDataChanged(originalAddressData, newAddressData);
      setModifiedSections(prev => ({
        ...prev,
        address: hasChanged
      }));
    }
  };

  // Handle input changes for store data
  const handleStoreInputChange = (field, value) => {
    if (isEditing) {
      const newStoreData = {
        ...storeData,
        [field]: value
      };
      setStoreData(newStoreData);

      // Mark store section as modified if data has changed
      const hasChanged = hasDataChanged(originalStoreData, newStoreData);
      setModifiedSections(prev => ({
        ...prev,
        store: hasChanged
      }));
    }
  };

  // Update handleCategoryChange to work with IDs
  const handleCategoryChange = (categoryId) => {
    if (isEditing) {
      const newCategories = storeData.categories.includes(categoryId)
        ? storeData.categories.filter(id => id !== categoryId)
        : [...storeData.categories, categoryId];
      const newStoreData = {
        ...storeData,
        categories: newCategories
      };
      setStoreData(newStoreData);
      // Mark store section as modified if data has changed
      const hasChanged = hasDataChanged(originalStoreData, newStoreData);
      setModifiedSections(prev => ({
        ...prev,
        store: hasChanged
      }));
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    if (isEditing) {
      // Reset all data to original values when canceling edit
      setUserData({ ...originalUserData });
      setAddressData({ ...originalAddressData });
      setStoreData({ ...originalStoreData });
      setModifiedSections({
        user: false,
        address: false,
        store: false
      });
    }
    setIsEditing(!isEditing);
  };

  // Add this helper function before handleSave
  const isAnyFieldBlank = () => {
    // User fields (email and phone are disabled, so only full_name is required)
    if (!userData.full_name.trim()) return true;
    // Address fields (all except uuid and address_type are required)
    if (!addressData.street_address.trim() || !addressData.apartment.trim() || !addressData.city.trim() || !addressData.state.trim() || !addressData.postal_code.trim() || !addressData.country.trim()) return true;
    // Store fields
    if (!storeData.store_name.trim() || storeData.categories.length === 0 || !storeData.inventory_estimate.trim() || !storeData.specialization.trim()) return true;
    return false;
  };

  // Save all changes
const handleSave = async () => {
  setSaving(true);
  try {
    const uuid = localStorage.getItem('uuid');
    const promises = [];

    // Update user data only if modified
    if (modifiedSections.user) {
      // Prepare user data - use full_name directly
      const userDataToUpdate = {};
      if (userData.full_name && userData.full_name.toString().trim() !== '') {
        userDataToUpdate.full_name = userData.full_name;
      }
      if (userData.email && userData.email.toString().trim() !== '') {
        userDataToUpdate.email = userData.email;
      }
      if (userData.phone_number && userData.phone_number.toString().trim() !== '') {
        userDataToUpdate.phone_number = userData.phone_number;
      }
      if (Object.keys(userDataToUpdate).length > 0) {
        promises.push(
          axiosInstance.patch(API_URL.USER.PATCH_USER_UUID(uuid), userDataToUpdate)
            .then(() => {
              console.log('User data updated successfully',API_URL.USER.PATCH_USER_UUID);
              setOriginalUserData({ ...userData });
            })
        );
      }
    }

    // Update address data only if modified
    if (modifiedSections.address) {
      const addressDataToSend = {
        house_name: addressData.apartment || '', // Map apartment to house_name
        street_name: addressData.street_address || '',
        city: addressData.city || '',
        state: addressData.state || '',
        pin: addressData.postal_code || '',
        country: addressData.country || '',
        address_type: addressData.address_type || 'Home',
        user_uuid: uuid
      };

      if (addressData.uuid) {
        // Update existing address using PATCH
        promises.push(
          axiosInstance.patch(API_URL.ADDRESS.PATCH_ADDRESS(addressData.uuid), addressDataToSend)
            .then(() => {
              console.log('Address updated successfully');
              setOriginalAddressData({ ...addressData });
            })
            .catch((error) => {
              console.error('Error updating address:', error);
              throw error;
            })
        );
      } else {
        // Create new address using POST
        promises.push(
          axiosInstance.post(API_URL.ADDRESS.POST_ADDRESS, addressDataToSend)
            .then((response) => {
              console.log('New address created successfully');
              const updatedAddressData = { ...addressData, uuid: response.data.uuid };
              setAddressData(updatedAddressData);
              setOriginalAddressData({ ...updatedAddressData });
            })
            .catch((error) => {
              console.error('Error creating address:', error);
              throw error;
            })
        );
      }
    }

    // Update store data only if modified
    if (modifiedSections.store) {
      const uuid = localStorage.getItem('uuid'); // Use the user's UUID for PATCH
      const storeDataToSend = {
        store_name: storeData.store_name,
        category_ids: storeData.categories, // Always send as array of numbers
        inventory_estimate: storeData.inventory_estimate,
        specialization: storeData.specialization
      };

      // Always PATCH using the user's UUID
      promises.push(
        axiosInstance.patch(
          API_URL.SELLERS.PATCH_SELLERS(uuid),
          storeDataToSend,
          { headers: { 'Content-Type': 'application/json' } }
        )
          .then(() => {
            console.log('Store data updated successfully');
            setOriginalStoreData({ ...storeData });
          })
          .catch((error) => {
            console.error('Error updating store:', error);
            throw error;
          })
      );
    }

    // Wait for all API calls to complete
    if (promises.length > 0) {
      await Promise.all(promises);
      alert('Profile updated successfully!');
    } else {
      alert('No changes to save.');
    }

    // Reset modification tracking
    setModifiedSections({
      user: false,
      address: false,
      store: false
    });

    setIsEditing(false);
  } catch (error) {
    console.error('Error saving profile:', error);
    let userFriendlyMessage = 'Error saving profile. Please try again.';
    if (error.response && error.response.data) {
      // Try to extract a meaningful message
      if (typeof error.response.data === 'string') {
        userFriendlyMessage = `Could not save profile: ${error.response.data}`;
      } else if (error.response.data.detail) {
        userFriendlyMessage = `Could not save profile: ${error.response.data.detail}`;
      } else if (error.response.data.message) {
        userFriendlyMessage = `Could not save profile: ${error.response.data.message}`;
      } else if (Array.isArray(error.response.data.errors)) {
        userFriendlyMessage = error.response.data.errors.map(e => e.message || e).join('\n');
      } else {
        userFriendlyMessage = 'Could not save profile due to a server error.';
      }
    }
    alert(userFriendlyMessage);
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="overflow-hidden">
        <NavBar />
        <div className="flex py-5 px-5 md:px-15 md:py-15 xl:py-0 xl:px-0">
          <SideBar />
          <div className="w-full xl:w-[75%] md:h-[700px] xl:max-h-[600px] font-sans border border-[#DEDEDE] xl:mt-15 rounded-[14px] shadow-[0_0_17px_0_#00000014] xl:px-10 xl:pt-8 flex items-center justify-center">
            <p className="text-[18px] text-[#464646]">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log(userData);

  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="flex py-5 px-5 md:px-15 md:py-15 xl:py-0 xl:px-0">
        <SideBar />
        <div className=" w-full    xl:w-[75%] md:h-[700px] xl:max-h-[600px] font-sans border border-[#DEDEDE] xl:mt-15 rounded-[14px] shadow-[0_0_17px_0_#00000014]  xl:px-10 xl:pt-8 ">
          {/* Title + Tabs */}
          <div className="relative ">
            <p className="text-[24px] md:text-[30px]  p-5 xl:p-0 lg:text-[32px] text-[#464646] font-bold">
              Seller Information
            </p>
            <img
              src=" /Images/Edit.svg"
              className="absolute text-[#107d91] top-5 left-60 md:top-7 md:left-70 lg:top-8 lg:left-75 xl:top-2 xl:left-72 cursor-pointer "
              onClick={handleEditClick}
            />

            {/* Save Button - only show when editing */}
            {isEditing && (
              <button
                onClick={handleSave}
                disabled={saving || isAnyFieldBlank()}
                className="absolute top-5 right-5 xl:top-2 xl:right-2 bg-[#107d91] text-white px-4 py-2 rounded-lg hover:bg-[#0d6b7a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            )}

            <Box sx={{ borderBottom: 1, borderColor: '#a3a3a3' }}>
              <Tabs
                value={tabIndex}
                onChange={handleChange}
                textColor="primary"
                TabIndicatorProps={{
                  children: <span className="MuiIndicator-span" />,
                  sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'transparent', // hide default bar
                    height: '4px',
                  },
                }}
              >
                <Tab
                  label="Personal"
                  disableRipple
                  sx={{
                    color: '#949494',
                    fontWeight: 'medium',
                    '&.Mui-selected': {
                      color: '#107d91',
                    },
                  }}
                />
                <Tab
                  label="Store Details"
                  disableRipple
                  sx={{
                    color: '#949494',
                    fontWeight: 'medium',
                    '&.Mui-selected': {
                      color: '#107d91',
                    },
                  }}
                />
              </Tabs>
            </Box>
          </div>

          {/* Personal Tab */}
          {tabIndex === 0 && (
            <div className="  flex flex-col md:flex-row h-[80%] py-5">
              <div className=" px-5 py-5  xl:py-0 xl:px-0 md:w-[50%] border-b md:border-b-transparent md:border-r border-[#E3E3E3]">
                <form className="flex flex-col gap-10">
                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Name
                    </label>
                    <div className="flex flex-col xl:flex-row gap-5">
                      <input
                        value={userData.full_name}
                        onChange={(e) => handleUserInputChange('full_name', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Full Name"
                        required
                        className={`w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                          }`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Email
                    </label>
                    <input
                      value={userData.email}
                      onChange={(e) => handleUserInputChange('email', e.target.value)}
                      disabled={true}
                      placeholder="Email"
                      className={`w-[90%] xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] bg-[#F4F4F4]`}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Phone Number
                    </label>
                    <input
                      value={userData.phone_number}
                      onChange={(e) => handleUserInputChange('phone_number', e.target.value)}
                      disabled={true}
                      placeholder="Phone Number"
                      className={`w-[90%] xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] bg-[#F4F4F4]`}
                    />
                  </div>
                </form>
              </div>

              <div className="px-5 py-5  md:w-[50%] xl:py-0 xl:px-10">
                <form className="flex flex-col gap-1">
                  <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                    Addresses
                  </label>
                  <div className="flex flex-col gap-4">
                    <input
                      value={addressData.street_address}
                      onChange={(e) => handleAddressInputChange('street_address', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Street Address"
                      required
                      className={`w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                        }`}
                    />
                    <input
                      value={addressData.apartment}
                      onChange={(e) => handleAddressInputChange('apartment', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Apartment/Suite"
                      required
                      className={`w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                        }`}
                    />
                    <input
                      value={addressData.city}
                      onChange={(e) => handleAddressInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      placeholder="City"
                      required
                      className={`w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                        }`}
                    />
                    <div className="flex flex-col xl:flex-row gap-[10px]">
                      <input
                        value={addressData.state}
                        onChange={(e) => handleAddressInputChange('state', e.target.value)}
                        disabled={!isEditing}
                        placeholder="State"
                        required
                        className={`w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                          }`}
                      />
                      <input
                        value={addressData.postal_code}
                        onChange={(e) => handleAddressInputChange('postal_code', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Postal Code"
                        required
                        className={`w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                          }`}
                      />
                    </div>
                    <input
                      value={addressData.country}
                      onChange={(e) => handleAddressInputChange('country', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Country"
                      required
                      className={`w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'
                        }`}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Store Details Tab */}
          {tabIndex === 1 && (
            <div className="py-5 h-[80%] flex flex-col md:flex-row ">
              <div className=" px-5 py-5  xl:px-0 xl:py-0 md:w-[50%]  h-full border-b md:border-b-transparent md:border-r border-[#E3E3E3]">
                <form className="flex flex-col gap-10">
                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Store Name
                    </label>
                    <div className="flex gap-5">
                      <input
                        value={storeData.store_name}
                        onChange={(e) => handleStoreInputChange('store_name', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Store Name"
                        required
                        className={`w-[90%] xl:w-[290px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Category
                    </label>
                    <div className="flex gap-5 flex-wrap">
                      {categoriesList.map((cat) => (
                        <label key={cat.id} className="flex gap-1 items-center font-regular text-[#464646]">
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={storeData.categories.includes(cat.id)}
                            onChange={() => handleCategoryChange(cat.id)}
                            disabled={!isEditing}
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row  xl:items-center gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Inventory Estimate
                    </label>
                    <select
                      value={storeData.inventory_estimate}
                      onChange={(e) => handleStoreInputChange('inventory_estimate', e.target.value)}
                      disabled={!isEditing}
                      required
                      className={`w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] pl-1 focus:outline-none focus:border-[#8d8c8c] ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'}`}
                    >
                      <option value="">Select estimate</option>
                      <option value="<1000">Less than 1000</option>
                      <option value="1000-5000">1000 - 5000</option>
                      <option value="5000+">5000+</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="md:w-[50%] p-5 xl:px-10 ">
                <form className="flex flex-col gap-1">
                  <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                    Specialization
                  </label>
                  <textarea
                    value={storeData.specialization}
                    onChange={(e) => handleStoreInputChange('specialization', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your store's specialization..."
                    required
                    style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
                    className={`w-[90%] h-[250px] xl:w-[400px] xl:h-[200px] border border-[#E3E3E3] rounded-[14px] focus:outline-none focus:border-[#8d8c8c] p-2 overflow-y-auto ${isEditing ? 'bg-white' : 'bg-[#F4F4F4]'}`}
                  ></textarea>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;