// import React from 'react';
// import NavBar from '../../Components/NavBar/navBar';
// import SideBar from '../../Components/Sidebar/sideBar';

// const Profile = () => {
//   return (
//     <div className="overflow-hidden">
//       <NavBar />
//       <div className="flex ">
//         <SideBar />
//         <div className="xl:w-[75%] border border-[#DEDEDE] xl:mt-15 rounded-[14px] hover:shadow-[0_0_17px_0_#00000014] transition-all duration-400 xl:px-10 xl:pt-8 py-25     ">
//           <div className="border-b flex flex-col pb-3 border-[#a3a3a3]   ">
//             <p className="xl:text-[32px] text-[#464646] font-bold ">
//               Seller Information
//             </p>
//             <div className=" flex items-center   gap-4 text-[#949494] font-bold  xl:h-[40px] ">
//               <p className="hover:mb-2 hover:text-[#107d91] transition-all duration-150 ease-in-out cursor-pointer ">
//                 Personal
//               </p>
//               <p className="hover:mb-2 hover:text-[#107d91] transition-all duration-150 ease-in-out cursor-pointer ">
//                 Store Details
//               </p>
//             </div>
//           </div>

//           <div className="flex h-full py-5 ">
//             <div className="w-[50%] border-r border-[#E3E3E3] ">
//               <form className="flex flex-col gap-10">
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[15px] font-bold text-[#464646] ">
//                     Name
//                   </label>

//                   <div className="flex gap-5">
//                     <input
//                       className="w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                       placeholder="First Name"
//                     />
//                     <input
//                       className="w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                       placeholder="Last Name"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                   <label className="text-[15px] font-bold text-[#464646] ">
//                     Email
//                   </label>
//                   <input
//                     className="w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="name@gmail.com"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[15px] font-bold text-[#464646] ">
//                     Phone Number
//                   </label>
//                   <input
//                     className="w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="Enter Your Number"
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="w-[50%] px-10 ">
//               <form className="flex flex-col gap-1 ">
//                 <label className="text-[15px] font-bold text-[#464646] ">
//                   Addresses
//                 </label>
//                 <div className="flex flex-col gap-4">
//                   <input
//                     className="w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="House name, Flat no"
//                   />
//                   <input
//                     className="w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="Street address"
//                   />
//                   <input
//                     className="w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="Street address"
//                   />
//                   <div className="flex gap-[10px]">
//                     <input
//                       className="w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                       placeholder="City"
//                     />
//                     <input
//                       className="w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                       placeholder="State"
//                     />
//                   </div>
//                   <input
//                     className="w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="Country"
//                   />
//                   <input
//                     className="w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="Pin"
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div>Second Tab</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import NavBar from '../../Components/NavBar/navBar';
import SideBar from '../../Components/Sidebar/sideBar';
import { Tabs, Tab, Box } from '@mui/material';
import { MdEdit } from 'react-icons/md';

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="flex py-5 px-5 md:px-15 md:py-15 xl:py-0 xl:px-0">
        <SideBar />
        <div className=" w-full    xl:w-[75%] md:h-[700px] xl:max-h-[600px] font-sans border border-[#DEDEDE] xl:mt-15 rounded-[14px] shadow-[0_0_17px_0_#00000014] xl:hover:shadow-[0_0_17px_0_#00000014] transition-all duration-400 xl:px-10 xl:pt-8 ">
          {/* Title + Tabs */}
          <div className="relative ">
            <p className="text-[24px] md:text-[30px]  p-5 xl:p-0 lg:text-[32px] text-[#464646] font-bold">
              Seller Information
            </p>
            <img
              src=" /Images/Edit.svg"
              className="absolute text-[#107d91] top-5 left-60 md:top-7 md:left-70 lg:top-8 lg:left-75 xl:top-2 xl:left-72 cursor-pointer "
            />

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
                        className="w-[90%]   xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                        placeholder="First Name"
                      />
                      <input
                        className=" w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Email
                    </label>
                    <input
                      className="w-[90%] xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="name@gmail.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Phone Number
                    </label>
                    <input
                      className="w-[90%] xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="Enter Your Number"
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
                      className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="House name, Flat no"
                    />
                    <input
                      className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="Street address"
                    />
                    <input
                      className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="Street address"
                    />
                    <div className="flex flex-col xl:flex-row gap-[10px]">
                      <input
                        className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                        placeholder="City"
                      />
                      <input
                        className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                        placeholder="State"
                      />
                    </div>
                    <input
                      className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="Country"
                    />
                    <input
                      className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                      placeholder="Pin"
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
                        className="w-[90%] xl:w-[290px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                        placeholder="Enter your store name"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                      Category
                    </label>
                    <div className="flex gap-5">
                      <label className="flex gap-1 items-center font-regular text-[#464646]">
                        <input type="checkbox" className="cursor-pointer" />
                        TCG
                      </label>
                      <label className="flex gap-1 items-center font-regular text-[#464646]">
                        <input type="checkbox" className="cursor-pointer" />
                        Comics
                      </label>
                      <label className="flex gap-1 items-center font-regular text-[#464646]">
                        <input type="checkbox" className="cursor-pointer" />
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
                    />
                  </div>
                </form>
              </div>

              <div className="md:w-[50%] p-5 xl:px-10 ">
                <form className="flex flex-col gap-1">
                  <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
                    Specialization
                  </label>
                  <textarea
                    style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
                    className="w-[90%] h-[250px] xl:w-[400px] xl:h-[200px] border border-[#E3E3E3] rounded-[14px] focus:outline-none focus:border-[#8d8c8c] p-2 overflow-y-auto "
                    placeholder="Eg: Welcome to Itachi Stores, your destination for rare and collectible comics. We specialize in curating vintage issues, limited editions, and must-have graphic novels for dedicated fans and serious collectors alike. Discover the stories that shaped generations."
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
