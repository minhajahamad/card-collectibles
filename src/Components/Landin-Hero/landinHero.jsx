import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/navBar';
import Modal from '../../Components/Modal/modal';

import { CiStar } from 'react-icons/ci';
import { BsLightningCharge } from 'react-icons/bs';
import { MdOutlineSecurity } from 'react-icons/md';
import { TiArrowRight } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';

const LandinHero = ({ onLearnMoreClick }) => {
  const LandinImages = [
    '/Images/Landin-img-1.png',
    '/Images/Landin-img-2.png',
    '/Images/Landin-img-3.png',
    '/Images/Landin-img-4.png',
    '/Images/Landin-img-5.png',
    '/Images/Landin-img-6.png',
    '/Images/Landin-img-7.png',
    '/Images/Landin-img-8.png',
    '/Images/Landin-img-9.png',
    '/Images/Landin-img-10.png',
  ];

  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [modalType, setModalType] = useState('login');

  const handleModalOpen = (type = 'login') => {
    setModalType(type);
    setIsmodalOpen(true);
  };

  // State for Tracking Index of Hover Image
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');

    const urlParams = new URLSearchParams(location.search);
    if (uuid && urlParams.has('refferal-code')) {
      // Remove query params and redirect to base path
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="relative overflow-hidden ">
      <NavBar onLoginClick={handleModalOpen} />
      {isModalOpen && (
        <Modal onClose={() => setIsmodalOpen(false)} initialView={modalType} />
      )}
      <div className="flex flex-col   xl:h-[110vh] relative">
        <div className="bg-gradient-to-bl from-[#DFF7F5] to-[#FFFEFA] xl:h-[60%] xl:px-10 xl:py-10 xl:flex xl:justify-around  xl:gap-10 ">
          <div className="flex flex-col gap-5 items-center xl:items-start py-10 xl:py-0  xl:gap-4 w-fit  ">
            <div className="flex items-center gap-1 bg-white px-5 w-fit py-3 rounded-[76px] shadow-md shadow-[#0000001C] hover:shadow-none cursor-pointer transition-all duration-400 ease-in-out ">
              <CiStar className="text-[#EEBB4E] text-[20px] " />
              <p className="text-[14px] text-[#15ABA0] font-semibold font-raleway ">
                Early Access Available
              </p>
            </div>
            <div className="text-center xl:text-left leading-tight xl:leading-normal ">
              <p className="font-raleway text-[32px] md:text-[40px] xl:text-[60px] font-extrabold">
                Start Selling your
              </p>
              <p className="font-raleway text-[32px] md:text-[40px]  xl:text-[60px] font-extrabold">
                <span className="text-[#00A397] text-[38px] md:text-[45px] xl:text-[70px]">
                  Collectible
                </span>{' '}
                Today!
              </p>
              <p className="  xl:w-[600px] mt-5 xl:mt-0 font-raleway text-[#46505E] font-medium text-[12px] xl:text-[14px]  ">
                Join the premier platform for trading cards, comics, and
                collectibles. <br /> Connect with serious collectors and grow
                your business with <br /> powerful tools designed specifically
                for sellers like you.
              </p>
            </div>
            <div className="w-[100vw] mt-5  relative fade-effect xl:hidden">
              <div className="marquee-track">
                {[...LandinImages, ...LandinImages].map((image, index) => (
                  <div key={index} className="marquee-image">
                    <img src={image} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                boxShadow: `
                    0px 4px 15.7px 0px rgba(0, 163, 151, 0.14),
                    0px 4px 106px 0px rgba(16, 125, 145, 0.14)`,
              }}
              className="bg-white xl:hidden rounded-[35px] w-[95%] h-[170px] px-4    flex flex-col  mt-5 mx-auto "
            >
              <div className="h-[50%] border-b border-[#E9E9E9] flex flex-col items-center py-5 ">
                <p className="font-bold font-raleway text-[23px] text-[#00A397]">
                  Ready to Start?
                </p>
                <p className="font-medium font-raleway text-[11.48px] text-[#46505E]">
                  Join thousands of sellers already using our platform.
                </p>
              </div>
              <div className="h-[50%] flex justify-around ">
                <div className=" flex flex-col items-center ">
                  <p className="font-bold font-raleway text-[22px] text-[#00A397]">
                    1000+
                  </p>
                  <p className="font-medium font-raleway text-[16px] text-[#46505E]">
                    Active Sellers
                  </p>
                </div>
                <div className=" flex flex-col items-center ">
                  <p className="font-bold font-raleway text-[22px] text-[#00A397]">
                    50K+
                  </p>
                  <p className="font-medium font-raleway text-[16px] text-[#46505E]">
                    Item Listed
                  </p>
                </div>
                <div className=" flex flex-col items-center ">
                  <p className="font-bold font-raleway text-[22px] text-[#00A397]">
                    95%
                  </p>
                  <p className="font-medium font-raleway text-[16px] text-[#46505E]">
                    Satisfication
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 mt-5">
              <div className="flex gap-5 font-semibold font-montserrat">
                <div
                  onClick={() => handleModalOpen('signup')}
                  className="rounded-[6px]  bg-[#00A397] text-white w-[250px] xl:w-[280px] py-2 pl-3 cursor-pointer flex items-center  gap-2 group "
                >
                  <p>Register Now-Early Access!</p>
                  <TiArrowRight className="text-[24px] font-light group-hover:ml-1 transition-all duration-300 ease-in-out group-active:ml-1 group-lg:active:ml-0" />
                </div>
                <div
                  onClick={onLearnMoreClick}
                  className="border bg-white border-[#00A397] rounded-[6px] text-[#00A397] flex items-center px-2 cursor-pointer  "
                >
                  <p>Learn More</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex gap-1 items-center group cursor-pointer">
                  <MdOutlineSecurity className="text-[#16B338] text-[14px] group-hover:scale-130  transition-all duration-200" />
                  <p className="font-raleway font-medium text-[12px] text-[#46505E]">
                    Secure Platform
                  </p>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer">
                  <BsLightningCharge className="text-[#31BC50] text-[14px] group-hover:scale-130  transition-all duration-200" />
                  <p className="font-raleway font-medium text-[12px] text-[#46505E]">
                    Instant Setup
                  </p>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer">
                  <CiStar className="text-[#EEBB4E] text-[14px]  group-hover:scale-130 transition-all duration-200 " />
                  <p className="font-raleway font-medium text-[12px] text-[#46505E]">
                    Premium Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="  hidden xl:block mt-5 relative  ">
            <img
              src="/Images/Konami.png"
              className="absolute top-[-20px] left-[-100px] z-0 h-60"
            />
            <div
              style={{
                boxShadow: `
                    0px 4px 15.7px 0px rgba(0, 163, 151, 0.14),
                    0px 4px 106px 0px rgba(16, 125, 145, 0.14)`,
              }}
              className="bg-white rounded-[35px] xl:w-[35vw]  xl:pt-13 flex flex-col gap-5 z-10 relative "
            >
              <div className="xl:pl-10">
                <p className="font-bold font-raleway text-[36px] text-[#00A397]">
                  Ready to Start?
                </p>
                <p className="font-medium font-raleway text-[18px] text-[#46505E]">
                  Join thousands of sellers already <br /> using our platform.
                </p>
              </div>
              <div className="xl:pl-5">
                <div className="border-b border-[#E9E9E9] xl:py-5 flex flex-col items-center xl:w-[300px]">
                  <p className="font-bold font-raleway text-[38px] text-[#00A397]">
                    1000+
                  </p>
                  <p className="font-medium font-raleway text-[27px] text-[#46505E]">
                    Active Sellers
                  </p>
                </div>
                <div className="border-b border-[#E9E9E9] xl:py-5 flex flex-col items-center xl:w-[300px]">
                  <p className="font-bold font-raleway text-[38px] text-[#00A397]">
                    50k+
                  </p>
                  <p className="font-medium font-raleway text-[27px] text-[#46505E]">
                    Items Listed
                  </p>
                </div>
                <div className=" xl:py-5 flex flex-col items-center xl:w-[300px]">
                  <p className="font-bold font-raleway text-[38px] text-[#00A397]">
                    95%
                  </p>
                  <p className="font-medium font-raleway text-[27px] text-[#46505E]">
                    Satisfication
                  </p>
                </div>
              </div>
              <img
                src="/Images/Falcon.png"
                className="absolute top-[-50px] right-[40px] z-10 h-30"
              />
              <div className="absolute bottom-[-50px] right-[-20px] ">
                <div className="relative z-10  rotate-[3.66deg] shadow-3d-card">
                  <div className="absolute inset-0 z-20 shine-effect pointer-events-none rounded-[9px]" />

                  <img
                    src="/Images/Charizard.png"
                    className="w-full h-full object-contain z-10 relative"
                  />
                </div>
              </div>
              <div className="absolute top-[100px] right-[-20px]">
                <div className="relative z-10 h-59 w-[160px] rotate-[-3.66deg] shadow-3d-card overflow-hidden rounded-[9px]">
                  <div className="absolute inset-0 z-20 shine-effect-delayed pointer-events-none rounded-[9px]" />

                  <img
                    src="/Images/Dark-magician.png"
                    className="h-full w-full object-contain z-10 relative"
                  />
                </div>
              </div>
              <img
                src="/Images/Eating-chrctr.png"
                className="absolute top-[-60px] left-[50px] z-10 h-30"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#09778E] h-[40%] xl:py-3 xl:pl-25 hidden xl:block">
          <div className="xl:w-[750px] overflow-hidden relative fade-effect">
            <div className="marquee-track">
              {[...LandinImages, ...LandinImages].map((image, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
                  className="marquee-image"
                >
                  <img
                    src={image}
                    className={`cursor-pointer transition-all duration-400 ease-in-out ${
                      hoveredImageIndex === null
                        ? 'opacity-100'
                        : hoveredImageIndex === index
                        ? 'scale-105 opacity-100 z-10 shadow-lg'
                        : 'opacity-30'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandinHero;
