// import React from 'react';

// const PersonalDetailForm = () => {
//   return (
//     <div className="w-full h-screen overflow-hidden bg-gradient-to-bl from-[#DFF7F5] to-[#FFFEFA] flex items-center justify-center ">
//       <div className=" w-[90%] h-[85%] shadow-[0_0_17px_0_#00000014] transition-all duration-400 bg-white rounded-[14px] flex flex-col px-5 ">
//         <div className="h-[20%]  border-b border-[#DEDEDE] flex justify-between px-10 ">
//           <div className="font-sans font-bold text-[40px] text-[#464646] items-center flex  ">
//             <p>Personal Detail Form</p>
//           </div>
//           <div className="flex items-center gap-6">
//             <div className="flex flex-col items-center">
//               <div className="w-9 h-9 rounded-full bg-[#464646] text-white flex items-center justify-center text-sm font-semibold">
//                 1
//               </div>
//               <p className="text-xs text-[#464646] text-center mt-2 leading-tight">
//                 Personal
//                 <br />
//                 Details Form
//               </p>
//             </div>

//             <div className="w-28 h-[2px] bg-[#D3D3D3]" />

//             <div className="flex flex-col items-center">
//               <div className="w-9 h-9 rounded-full bg-[#E0E0E0] text-[#a0a0a0] flex items-center justify-center text-sm font-semibold">
//                 2
//               </div>
//               <p className="text-xs text-[#a0a0a0] text-center mt-2 leading-tight">
//                 Seller
//                 <br />
//                 Details Form
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="h-[80%] flex py-5">
//           <div className="border-r border-[#DEDEDE] w-[50%] px-10 flex flex-col gap-5  ">
//             <div className="bg-[#C2C2C233] w-fit rounded-sm ">
//               <img
//                 src="/Images/image-placeholder.png"
//                 className="xl:w-[210px] xl:h-[150px] shadow"
//               />
//             </div>
//             <form className="flex flex-col gap-8">
//               <div className="flex flex-col gap-1">
//                 <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
//                   Name
//                 </label>
//                 <div className="flex flex-col xl:flex-row gap-5">
//                   <input
//                     className="w-[90%]   xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="First Name"
//                   />
//                   <input
//                     className=" w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="Last Name"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
//                   Phone Number
//                 </label>
//                 <input
//                   className=" w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                   placeholder="0000 0000"
//                 />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
//                   Email
//                 </label>
//                 <div className="flex gap-5 items-center">
//                   <input
//                     className="   xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="name@gmail.com"
//                   />
//                   <p className="text-[16px] font-bold font-sans text-[#467EF8] cursor-pointer hover:text-[#769beb] transition-all duration-200 ease-initial  ">
//                     Verify Now
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="w-[50%] px-10 relative ">
//             <form className="flex flex-col gap-1">
//               <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
//                 Addresses
//               </label>
//               <div className="flex flex-col gap-4">
//                 <input
//                   className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                   placeholder="House name, Flat no"
//                 />
//                 <input
//                   className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                   placeholder="Street address"
//                 />
//                 <input
//                   className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                   placeholder="Street address"
//                 />
//                 <div className="flex flex-col xl:flex-row gap-[10px]">
//                   <input
//                     className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="City"
//                   />
//                   <input
//                     className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                     placeholder="State"
//                   />
//                 </div>
//                 <input
//                   className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                   placeholder="Country"
//                 />
//                 <input
//                   className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
//                   placeholder="Pin"
//                 />
//               </div>
//             </form>
//             <div className="w-[100px] h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[18px] flex items-center justify-center absolute bottom-[20px] right-[20px] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer ">
//               <p>Next</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalDetailForm;
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PersonalDetailForm = ({ onNext }) => {
  return (
    <div className="h-[80%] flex py-5">
      {/* Left Side */}
      <div className="border-r border-[#DEDEDE] w-[50%] px-10 flex flex-col gap-5">
        <div className="bg-[#C2C2C233] w-fit rounded-sm">
          <img
            src="/Images/image-placeholder.png"
            className="xl:w-[210px] xl:h-[150px] shadow"
          />
        </div>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Name
            </label>
            <div className="flex flex-col xl:flex-row gap-5">
              <input
                className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                placeholder="First Name"
              />
              <input
                className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Phone Number
            </label>
            <input
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
              placeholder="0000 0000"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Email
            </label>
            <div className="flex gap-5 items-center">
              <input
                className="xl:w-[310px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
                placeholder="name@gmail.com"
              />
              <p className="text-[16px] font-bold font-sans text-[#467EF8] cursor-pointer hover:text-[#769beb] transition-all duration-200 ease-initial">
                Verify Now
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="w-[50%] px-10 relative">
        <form className="flex flex-col gap-1">
          <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
            Addresses
          </label>
          <div className="flex flex-col gap-4">
            <input
              className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="House name, Flat no"
            />
            <input
              className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Street address"
            />
            <input
              className="w-[90%] xl:w-[350px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Landmark"
            />
            <div className="flex flex-col xl:flex-row gap-[10px]">
              <input
                className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="City"
              />
              <input
                className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
                placeholder="State"
              />
            </div>
            <input
              className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Country"
            />
            <input
              className="w-[90%] xl:w-[170px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1"
              placeholder="Pin"
            />
          </div>
        </form>
        <div
          className="w-[100px] h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[18px] flex items-center justify-center absolute bottom-[20px] right-[20px] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            setTimeout(() => {
              onNext();
            }, 300);
          }}
        >
          <p>Next</p>
        </div>
      </div>
    </div>
  );
};

const SellingDetailForm = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[80%] flex py-5">
      <div className="border-r border-[#DEDEDE] w-[50%] px-10 flex flex-col gap-5">
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <label className="lg:text-[18px] xl:text-[15px] font-bold text-[#464646]">
              Store Name
            </label>
            <input
              className="w-[90%] xl:w-[210px] h-10 border border-[#E3E3E3] rounded-[8px] bg-[#F4F4F4] pl-1 focus:outline-none focus:border-[#8d8c8c]"
              placeholder="Store"
            />
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
      <div className="w-[50%] px-10 relative ">
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
        <div
          onClick={() => {
            setTimeout(() => {
              navigate('/user/profile');
            }, 200);
          }}
          className="w-[120px] h-[40px] bg-[#00A397] rounded-[6px] text-white font-semibold font-montserrat text-[16px] flex items-center justify-center absolute bottom-[20px] right-[20px] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <p>Continue</p>
        </div>
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
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
          step === 1
            ? 'bg-[#464646] text-white'
            : step > 1
            ? 'bg-[#16B338] text-white'
            : 'bg-[#E0E0E0] text-[#a0a0a0]'
        }`}
      >
        1
      </div>
      <p
        className={`text-xs text-center mt-2 leading-tight transition-all duration-300 ${
          step >= 1 ? 'text-[#464646]' : 'text-[#a0a0a0]'
        }`}
      >
        Personal
        <br />
        Details Form
      </p>
    </div>
    <div className="relative w-28 h-[8px] bg-[#D3D3D3] overflow-hidden rounded-sm">
      <div
        className={`h-full transition-all duration-1000 ${
          step === 2 ? 'w-full' : 'w-0'
        } bg-gradient-to-r from-[#16B338] via-[#16B338] to-[#C7C7C7]`}
      />
    </div>
    <div className="flex flex-col items-center">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
          step === 2 ? 'bg-[#464646] text-white' : 'bg-[#E0E0E0] text-[#a0a0a0]'
        }`}
      >
        2
      </div>
      <p
        className={`text-xs text-center mt-2 leading-tight transition-all duration-300 ${
          step === 2 ? 'text-[#464646]' : 'text-[#a0a0a0]'
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
          <PersonalDetailForm onNext={() => setStep(2)} />
        ) : (
          <SellingDetailForm />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
