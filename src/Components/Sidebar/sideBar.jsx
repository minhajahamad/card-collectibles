// import React, { useState } from 'react';
// import { CiPower } from 'react-icons/ci';

// import { useNavigate } from 'react-router-dom';

// const SideBar = () => {
//   const [activeTab, setActiveTab] = useState('Profile');

//   const menuItems = ['Profile', 'Affiliates', 'Help & Support'];

//   const navigate = useNavigate();
//   return (
//     <div className="xl:w-[310px]   xl:py-[60px] font-sans flex flex-col gap-10 ">
//       <div className="bg-[#C2C2C233]  xl:w-fit  rounded-sm mx-auto relative ">
//         <img
//           src="/Images/image-placeholder.png"
//           className="xl:w-[190px] xl:h-[150px] shadow   "
//         />
//       </div>
//       <div className="flex flex-col gap-40">
//         <div className="   xl:pl-10 xl:pr-7  text-[#464646]     xl:text-[22px]   ">

//           {menuItems.map(item => (
//             <div
//               key={item}
//               onClick={() => setActiveTab(item)}
//               className="relative px-8 py-2 cursor-pointer overflow-hidden border-b-2 border-[#E0E0E0] flex items-center"
//             >
//               <span
//                 className={`absolute left-0 top-1/2 h-[35px] w-[4px] rounded-r-sm bg-[#107D91] -translate-y-1/2 transition-all duration-300 ease-in-out ${
//                   activeTab === item ? 'opacity-100' : 'opacity-0'
//                 }`}
//               />
//               <p
//                 className={`transition-colors duration-300 ${
//                   activeTab === item ? 'text-black' : 'text-[#464646]'
//                 } hover:text-black`}
//               >
//                 {item}
//               </p>
//             </div>
//           ))}
//         </div>
//         <div className="mx-auto flex gap-2 items-center border-2 border-[#107D91] group  rounded-[64px] px-3 py-2 shadow-[0px_2px_16.4px_0px_#0000001C] hover:shadow-none cursor-pointer ">
//           <CiPower className="text-[#C84047] text-[20px] group-active:scale-90 transition duration-150 ease-in-out" />
//           <p className="text-[18px]  text-[#707070] ">Log Out</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

import React from 'react';
import { CiPower } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      {/* Image */}
      <div className="bg-[#C2C2C233] xl:w-fit rounded-sm mx-auto relative">
        <img
          src="/Images/image-placeholder.png"
          className="xl:w-[190px] xl:h-[150px] shadow"
        />
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
              className={`absolute left-0 top-1/2 w-[4px] h-[40px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                activeTab === 'profile' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <p
              className={`transition-colors duration-300 ${
                activeTab === 'profile'
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
              className={`absolute left-0 top-1/2 w-[4px] h-[40px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                activeTab === 'affiliates' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <p
              className={`transition-colors duration-300 ${
                activeTab === 'affiliates'
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
              className={`absolute left-0 top-1/2 w-[4px] h-[40px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                activeTab === 'support' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <p
              className={`transition-colors duration-300 ${
                activeTab === 'support'
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
