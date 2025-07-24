import React, { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { CiPower } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'));

  console.log(userData);

  const getActiveTab = () => {
    if (location.pathname.includes('/user/profile')) return 'profile';
    if (location.pathname.includes('/user/affiliates')) return 'affiliates';
    if (location.pathname.includes('/user/help-support')) return 'support';
    return '';
  };

  const activeTab = getActiveTab();

  const handleNavigate = route => {
    navigate(route);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-sm bg-black/50 z-40 xl:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[270px] sm:w-[330px] md:w-[400px] lg:w-[500px] bg-white rounded-bl-[12px] rounded-tl-[12px] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } xl:hidden flex flex-col justify-between pb-30 `}
      >
        {/* Top Content */}
        <div className="flex flex-col ">
          {/* Close Button */}
          <div className="flex justify-end p-3">
            <IoIosClose
              className="text-[38px] sm:text-[42px] md:text-[46px] cursor-pointer text-black"
              onClick={onClose}
            />
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-col px-5 gap-5">
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-2 text-[#09778E]">
              <div className="rounded-full border-2 border-black p-1">
                <img
                  src="/Images/Landin-img-6.png"
                  alt="Profile"
                  className="w-[60px] sm:w-[70px] md:w-[85px] h-[60px] sm:h-[70px] md:h-[85px] object-cover rounded-full object-top"
                />
              </div>

              <p className="font-semibold text-[14px] sm:text-[15px] md:text-[16px]">
                {userData?.full_name} {userData?.last_name}
              </p>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2 text-[#464646] text-[15px] sm:text-[16px] md:text-[17px]">
              {[
                {
                  name: 'Seller Profile',
                  route: '/user/profile',
                  key: 'profile',
                },
                {
                  name: 'Affiliates',
                  route: '/user/affiliates',
                  key: 'affiliates',
                },
                {
                  name: 'Help & Support',
                  route: '/user/help-support',
                  key: 'support',
                },
              ].map(item => (
                <div
                  key={item.key}
                  onClick={() => handleNavigate(item.route)}
                  className="relative px-6 py-2 cursor-pointer overflow-hidden border-b border-[#E0E0E0] flex items-center"
                >
                  <span
                    className={`absolute left-0 top-1/2 w-[4px] h-[35px] rounded-r-sm bg-[#107D91] transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                      activeTab === item.key ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <p
                    className={`transition-colors duration-300 ${
                      activeTab === item.key
                        ? 'text-black font-semibold'
                        : 'text-[#464646]'
                    } hover:text-black`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logout Button (bottom fixed) */}
        <div className="p-4 sm:p-5 ">
          <div
            onClick={() => {
              localStorage.clear();
              localStorage.setItem('login', 'false');
              setTimeout(() => {
                navigate('/');
              }, 250);
            }}
            className="w-full border border-[#107D91] text-[#09778E] cursor-pointer font-semibold px-3 py-2 sm:px-4 sm:py-2.5 rounded-[14px] flex items-center gap-2 shadow-[0px_2px_16.4px_0px_#0000001C]   text-[13px] sm:text-[14px] md:text-[15px] justify-center group"
          >
            <CiPower className="text-lg text-[#C84047] group-active:scale-90 transition duration-150 ease-in-out" />
            Log Out
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
