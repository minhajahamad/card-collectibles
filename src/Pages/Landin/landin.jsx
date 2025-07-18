// import React, { useState } from 'react';
// import NavBar from '../../Components/NavBar/navBar';
// import Modal from '../../Components/Modal/modal';

// import { CiStar } from 'react-icons/ci';
// import { BsLightningCharge } from 'react-icons/bs';
// import { MdOutlineSecurity } from 'react-icons/md';

// const Landin = () => {
//   const LandinImages = [
//     '/Images/Landin-img-1.png',
//     '/Images/Landin-img-2.png',
//     '/Images/Landin-img-3.png',
//     '/Images/Landin-img-4.png',
//     '/Images/Landin-img-5.png',
//   ];

//   const [isModalOpen, setIsmodalOpen] = useState(false);

//   return (
//     <div className="relative overflow-hidden">
//       <NavBar onLoginClick={() => setIsmodalOpen(true)} />
//       {isModalOpen && <Modal onClose={() => setIsmodalOpen(false)} />}
//       <div className="flex flex-col h-screen relative">
//         <div className="bg-gradient-to-bl from-[#DFF7F5] to-[#FFFEFA] h-[70%] xl:pl-25 xl:py-10">
//           <div className="flex flex-col gap-4  ">
//             <div className="flex items-center gap-1 bg-white px-5 w-fit py-3 rounded-[76px] shadow-md shadow-[#0000001C] hover:shadow-none cursor-pointer transition-all duration-400 ease-in-out ">
//               <CiStar className="text-[#EEBB4E] text-[20px] " />
//               <p className="text-[14px] text-[#15ABA0] font-semibold font-raleway ">
//                 Early Access Available
//               </p>
//             </div>
//             <div>
//               <p className="font-raleway text-[70px] font-extrabold">
//                 Start Selling your
//               </p>
//               <p className="font-raleway text-[70px] font-extrabold">
//                 <span className="text-[#00A397]">Collectible</span> Today!
//               </p>
//               <p className=" xl:w-[600px] font-raleway text-[#46505E] font-medium ">
//                 Join the premier platform for trading cards, comics, and
//                 collectibles. <br /> Connect with serious collectors and grow
//                 your business with <br /> powerful tools designed specifically
//                 for sellers like you.
//               </p>
//             </div>
//             <div className="flex flex-col gap-3">
//               <div className="flex gap-5 font-semibold font-montserrat">
//                 <div className="rounded-[6px]  bg-[#00A397] text-white xl:px-5 xl:py-2 cursor-pointer">
//                   <p>Register Now-It's Free!</p>
//                 </div>
//                 <div className="border bg-white border-[#00A397] rounded-[6px] text-[#00A397] flex items-center xl:px-2 cursor-pointer ">
//                   <p>Learn More</p>
//                 </div>
//               </div>
//               <div className="flex gap-8">
//                 <div className="flex gap-1 items-center group cursor-pointer">
//                   <MdOutlineSecurity className="text-[#16B338] text-[14px] group-hover:scale-130  transition-all duration-200" />
//                   <p className="font-raleway font-medium text-[12px] text-[#46505E]">
//                     Secure Platform
//                   </p>
//                 </div>
//                 <div className="flex gap-1 items-center group cursor-pointer">
//                   <BsLightningCharge className="text-[#31BC50] text-[14px] group-hover:scale-130  transition-all duration-200" />
//                   <p className="font-raleway font-medium text-[12px] text-[#46505E]">
//                     Instant Setup
//                   </p>
//                 </div>
//                 <div className="flex gap-1 items-center group cursor-pointer">
//                   <CiStar className="text-[#EEBB4E] text-[14px]  group-hover:scale-130 transition-all duration-200 " />
//                   <p className="font-raleway font-medium text-[12px] text-[#46505E]">
//                     Premium Support
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-[#09778E] h-[40%] xl:py-3 xl:pl-25">
//           <div className="xl:w-[750px] overflow-hidden relative fade-effect">
//             <div className="marquee-track">
//               {[...LandinImages, ...LandinImages].map((image, index) => (
//                 <div key={index} className="marquee-image">
//                   <img src={image} alt="" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="absolute xl:top-20 xl:right-15  ">
//           <img
//             src="/Images/Konami.png"
//             className="absolute top-[-2px] left-[-121px] z-0 h-60"
//           />
//           <div
//             style={{
//               boxShadow: `
//                     0px 4px 15.7px 0px rgba(0, 163, 151, 0.14),
//                     0px 4px 106px 0px rgba(16, 125, 145, 0.14)`,
//             }}
//             className="bg-white rounded-[35px] xl:w-[500px] xl:h-[600px] xl:pt-13      flex flex-col gap-5 z-10 relative "
//           >
//             <div className="xl:pl-10">
//               <p className="font-bold font-raleway text-[36px] text-[#00A397]">
//                 Ready to Start?
//               </p>
//               <p className="font-medium font-raleway text-[18px] text-[#46505E]">
//                 Join thousands of sellers already <br /> using our platform.
//               </p>
//             </div>
//             <div className="xl:pl-5">
//               <div className="border-b border-[#E9E9E9] xl:py-5 flex flex-col items-center xl:w-[300px]">
//                 <p className="font-bold font-raleway text-[38px] text-[#00A397]">
//                   1000+
//                 </p>
//                 <p className="font-medium font-raleway text-[27px] text-[#46505E]">
//                   Active Sellers
//                 </p>
//               </div>
//               <div className="border-b border-[#E9E9E9] xl:py-5 flex flex-col items-center xl:w-[300px]">
//                 <p className="font-bold font-raleway text-[38px] text-[#00A397]">
//                   50k+
//                 </p>
//                 <p className="font-medium font-raleway text-[27px] text-[#46505E]">
//                   Items Listed
//                 </p>
//               </div>
//               <div className=" xl:py-5 flex flex-col items-center xl:w-[300px]">
//                 <p className="font-bold font-raleway text-[38px] text-[#00A397]">
//                   95%
//                 </p>
//                 <p className="font-medium font-raleway text-[27px] text-[#46505E]">
//                   Satisfication
//                 </p>
//               </div>
//             </div>
//           </div>
//           <img
//             src="/Images/Falcon.png"
//             className="absolute top-[-75px] right-[38px] z-10 h-30"
//           />
//           <img
//             src="/Images/Charizard.png"
//             className="absolute bottom-[-53px] right-[-40px] z-10 h-70"
//           />
//           <img
//             src="/Images/Dark-magician.png"
//             className="absolute top-[104px] right-[-27px] z-10 h-60"
//           />
//           <img
//             src="/Images/Eating-chrctr.png"
//             className="absolute top-[-100px] left-[36px] z-10 h-30"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landin;

import React from 'react';
import LandinHero from '../../Components/Landin-Hero/landinHero';
import LandinJoin from '../../Components/Landin-Join/landinJoin';
import Footer from '../../Components/Footer/footer';
const Landin = () => {
  return (
    <div>
      <LandinHero />
      <LandinJoin />
      <Footer />
    </div>
  );
};

export default Landin;
